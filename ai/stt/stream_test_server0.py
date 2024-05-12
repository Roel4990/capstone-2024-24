import datetime
import VAD_STT as au

import numpy as np
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio_server = SocketIO(app)

stt = au.VADAudio(input_rate=16000)



@socketio_server.on("audio")
def handle_audio(data):
    audio = data["audio"]
    text = stt.vad_collector(audio)

    socketio_server.emit("response", {"text": text})



if __name__ == "__main__":
    socketio_server.run(app, allow_unsafe_werkzeug=True)