import datetime
import wave

import numpy as np
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio_server = SocketIO(app)

global frame_queue  # 프레임을 저장할 큐. 글로벌 선언이므로, 어느 함수에서든 접근 가능
frame_queue = []


def write_wave(path, audio, sample_rate):
    """오디오 데이터를 WAV 파일로 저장하는 함수"""
    audio = np.frombuffer(audio, dtype=np.int16)
    with wave.open(path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio.tobytes())


def queueing_process(audio, sample_rate, frame_duration):
    """프레임을 큐에 저장하는 함수"""
    global frame_queue
    frame_size = int(sample_rate * frame_duration / 1000)  # 프레임 사이즈 계산
    for i in range(0, len(audio), frame_size):
        frame = audio[i : i + frame_size]
        frame_queue.append(frame.tobytes())


@socketio_server.on("audio")
def handle_audio(data):
    audio = data["audio"]
    sample_rate = data["sample_rate"]
    frame_duration = 100
    audio = np.frombuffer(audio, dtype=np.int16)
    queueing_process(audio, sample_rate, frame_duration)

    # TODO: 해당 부분은 자유롭게 수정 가능. 다른 프로세스의 소켓으로 프레임을 리다이렉션하거나, 프레임을 처리하는 함수를 호출할 수 있음.
    if (
        len(frame_queue) >= 300
    ):  # 30개 이상의 프레임이 검출되었을 때만 파일로 저장. 초로 환산하면 대략 3초
        """임시적으로 프레임이 충분히 쌓이면 return 하는 코드를 추가함."""
        filename = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        # 프레임을 큐에서 소비함. 파일을 저장하려면 주석 제거
        # write_wave(f'{filename}.wav', b''.join(frame_queue), sample_rate)
        print(f"File {filename}.wav saved")
        socketio_server.emit("response", {"text": "추천 메뉴 하나 줘."})
        frame_queue.clear()


if __name__ == "__main__":
    socketio_server.run(app, allow_unsafe_werkzeug=True)
