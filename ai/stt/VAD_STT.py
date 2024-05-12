import collections, queue
import numpy as np
import pyaudio
import webrtcvad
import torch
import torchaudio
import whisper

class Audio(object):
    """Streams raw audio from microphone. Data is received in a separate thread, and stored in a buffer, to be read from."""

    FORMAT = pyaudio.paInt16
    # Network/VAD rate-space
    RATE_PROCESS = 16000
    CHANNELS = 1
    BLOCKS_PER_SECOND = 50

    def __init__(self, callback=None, device=None, input_rate=RATE_PROCESS):
        self.buffer_queue = queue.Queue()
        self.device = device
        self.input_rate = input_rate
        self.sample_rate = self.RATE_PROCESS
        self.block_size = int(self.RATE_PROCESS / float(self.BLOCKS_PER_SECOND))  # 800
        self.block_size_input = int(self.input_rate / float(self.BLOCKS_PER_SECOND))  # 800
        self.pa = pyaudio.PyAudio()

        kwargs = {
            'format': self.FORMAT,
            'channels': self.CHANNELS,
            'rate': self.input_rate,
            'input': True,
            'frames_per_buffer': self.block_size_input,
        }

        self.chunk = None
        # if not default device
        if self.device:
            kwargs['input_device_index'] = self.device

        self.stream = self.pa.open(**kwargs)
        self.stream.start_stream()

    def read(self):
        """Return a block of audio data, blocking if necessary."""
        print(self.block_size_input)
        return self.stream.read(self.block_size_input)

    def destroy(self):
        self.stream.stop_stream()
        self.stream.close()
        self.pa.terminate()

    frame_duration_ms = property(lambda self: 1000 * self.block_size // self.sample_rate)


# =====================


class VADAudio():
    """Filter & segment audio with voice activity detection."""

    def __init__(self, padding_ms=300, aggressiveness=3, device=None, input_rate=16000, block_size = 800):
        '''self.audio = Audio(device=device,
                    input_rate=input_rate)'''
        self.sample_rate = input_rate
        frame_duration_ms = 1000 * block_size // self.sample_rate
        
        # load silero VAD
        torchaudio.set_audio_backend("soundfile")
        self.vadS, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad',
                                            model='silero_vad',
                                            force_reload=True)
        (self.get_speech_ts, _, _, _, _) = utils
        print("silero-vad model loaded")
    
        # whisper
        self.whisper_model = whisper.load_model("medium")
        print("Whisper model loaded")

        self.vadW = webrtcvad.Vad(aggressiveness)

        num_padding_frames = padding_ms // frame_duration_ms
        self.ring_buffer = collections.deque(maxlen=num_padding_frames)
        self.triggered = False

        self.wav_data = bytearray()

    '''def frame_generator(self):
        """Generator that yields all audio frames from microphone."""
        if self.audio.input_rate == self.audio.RATE_PROCESS:
            while True:
                self.vad_collector(self.audio.read())
        else:
            raise Exception("Resampling required")'''

    def vad_collector(self, frame, ratio=0.75):
        """
            Generator that yields series of consecutive audio frames comprising each utterence, separated by yielding a single None.
            Determines voice activity by ratio of frames in padding_ms. Uses a buffer to include padding_ms prior to being triggered.
            Example: (frame, ..., frame, None, frame, ..., frame, None, ...)
                      |---utterence---|        |---utterence---|
        """
        result = None

        # print(len(frame))
        if len(frame) < 640:
            return

        is_speech = self.vadW.is_speech(frame, self.sample_rate)

        if not self.triggered:
                self.ring_buffer.append((frame, is_speech))
                num_voiced = len([f for f, speech in self.ring_buffer if speech])
                if num_voiced > ratio * self.ring_buffer.maxlen:
                    self.triggered = True
                    for f, s in self.ring_buffer:
                        result = self.vad(f)
                    self.ring_buffer.clear()

        else:
                result = self.vad(frame)
                self.ring_buffer.append((frame, is_speech))
                num_unvoiced = len([f for f, speech in self.ring_buffer if not speech])
                if num_unvoiced > ratio * self.ring_buffer.maxlen:
                    self.triggered = False
                    result = self.vad(None)
                    self.ring_buffer.clear()
        
        return result



    def vad(self, frame):
        # Start audio with VAD
        # frames = self.vad_collector()
        result = None
        # for frame in frames:
        if frame is not None:
                self.wav_data.extend(frame)
        else:
                print("webRTC has detected a possible speech")

                newsound= np.frombuffer(self.wav_data, np.int16)
                audio_float32= self.Int2Float(newsound)
                time_stamps =self.get_speech_ts(audio_float32, self.vadS)

                if(len(time_stamps)>0):
                    print("silero VAD has detected a possible speech")
                    audio = whisper.pad_or_trim(audio_float32)
                    mel = whisper.log_mel_spectrogram(audio)
                    options = whisper.DecodingOptions(language = 'ko', without_timestamps=True, fp16 = False)
                    transcript = whisper.decode(self.whisper_model, mel, options)
                    print(transcript.text)
                    result = transcript.text
                else:
                    print("silero VAD has detected a noise")

                print()
                self.wav_data = bytearray()

        return result


    def Int2Float(self, sound):
        _sound = np.copy(sound)  #
        abs_max = np.abs(_sound).max()
        _sound = _sound.astype('float32')
        if abs_max > 0:
            _sound *= 1/abs_max
        audio_float32 = torch.from_numpy(_sound.squeeze())
        return audio_float32

def main(ARGS):
        # Start audio with VAD
        vad_audio = VADAudio(aggressiveness=ARGS.webRTC_aggressiveness,
                            device=ARGS.device,
                            input_rate=ARGS.rate)
        
        audio = Audio(ARGS.device,
                    input_rate=ARGS.rate)
        
        while True:
            a = audio.read()
            vad_audio.vad_collector(a)

if __name__ == '__main__':
    DEFAULT_SAMPLE_RATE = 16000

    import argparse
    parser = argparse.ArgumentParser(description="Stream from microphone to webRTC and silero VAD")

    parser.add_argument('-v', '--webRTC_aggressiveness', type=int, default=3,
                        help="Set aggressiveness of webRTC: an integer between 0 and 3, 0 being the least aggressive about filtering out non-speech, 3 the most aggressive. Default: 3")
    parser.add_argument('--nospinner', action='store_true',
                        help="Disable spinner")
    parser.add_argument('-d', '--device', type=int, default=None,
                        help="Device input index (Int) as listed by pyaudio.PyAudio.get_device_info_by_index(). If not provided, falls back to PyAudio.get_default_device().")

    parser.add_argument('-name', '--silaro_model_name', type=str, default="silero_vad",
                        help="select the name of the model. You can select between 'silero_vad',''silero_vad_micro','silero_vad_micro_8k','silero_vad_mini','silero_vad_mini_8k'")
    parser.add_argument('--reload', action='store_true',help="download the last version of the silero vad")

    parser.add_argument('-ts', '--trig_sum', type=float, default=0.25,
                        help="overlapping windows are used for each audio chunk, trig sum defines average probability among those windows for switching into triggered state (speech state)")

    parser.add_argument('-nts', '--neg_trig_sum', type=float, default=0.07,
                        help="same as trig_sum, but for switching from triggered to non-triggered state (non-speech)")

    parser.add_argument('-N', '--num_steps', type=int, default=8,
                        help="nubmer of overlapping windows to split audio chunk into (we recommend 4 or 8)")

    parser.add_argument('-nspw', '--num_samples_per_window', type=int, default=4000,
                        help="number of samples in each window, our models were trained using 4000 samples (250 ms) per window, so this is preferable value (lesser values reduce quality)")

    parser.add_argument('-msps', '--min_speech_samples', type=int, default=10000,
                        help="minimum speech chunk duration in samples")

    parser.add_argument('-msis', '--min_silence_samples', type=int, default=500,
                        help=" minimum silence duration in samples between to separate speech chunks")
    ARGS = parser.parse_args()
    ARGS.rate=DEFAULT_SAMPLE_RATE
    main(ARGS)