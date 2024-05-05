import numpy as np
import pyaudio
import socketio

sio = socketio.Client()

p = pyaudio.PyAudio()
stream = p.open(
    format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024
)


@sio.event
def connect():
    print("connection established")


@sio.event
def disconnect():
    print("disconnected from server")


@sio.on("response")
def response(data):
    print(data["text"])


sio.connect("http://127.0.0.1:5000")

while True:
    audio = stream.read(1024)
    audio = np.frombuffer(audio, dtype=np.int16)
    sio.emit("audio", {"audio": audio.tobytes(), "sample_rate": 44100})
