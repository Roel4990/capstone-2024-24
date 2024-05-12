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



@socketio_server.on("audio")
def handle_audio(data):
    audio = data["audio"]
    text = stt.vad_collector(audio)

    socketio_server.emit("response", {"text": text})



if __name__ == "__main__":
    socketio_server.run(app, allow_unsafe_werkzeug=True)