import datetime
import VAD_STT as au

import numpy as np
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio_server = SocketIO(app)

global frame_queue  # 프레임을 저장할 큐. 글로벌 선언이므로, 어느 함수에서든 접근 가능
frame_queue = []

stt = au.VADAudio(input_rate=16000)



'''
def queueing_process(audio, sample_rate, frame_duration):
    """프레임을 큐에 저장하는 함수"""
    global frame_queue
    frame_size = int(sample_rate * frame_duration / 1000)  # 프레임 사이즈 계산
    for i in range(0, len(audio), frame_size):
        frame = audio[i : i + frame_size]
        frame_queue.append(frame.tobytes())
'''

@socketio_server.on("audio")
def handle_audio(data):
    audio = data["audio"]
    # audio = np.frombuffer(audio, dtype=np.int16)
    # queueing_process(audio, sample_rate, frame_duration)
    text = stt.vad_collector(audio)
    socketio_server.emit("response", {"text": text})



if __name__ == "__main__":
    socketio_server.run(app, allow_unsafe_werkzeug=True)