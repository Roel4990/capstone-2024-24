import queue
import numpy as np
import pyaudio
import socketio

sio = socketio.Client()

p = pyaudio.PyAudio()

stream = p.open(
    format=pyaudio.paInt16, 
    channels=1, 
    rate=16000, 
    input=True, 
    input_device_index = None, # device number (choose microphone, 'None' mean device default)
    frames_per_buffer=320
)


@sio.event
def connect():
    print("connection established")
    stream.start_stream()
    


@sio.event
def disconnect():
    print("disconnected from server")

    try:
        if stream.is_active():
            stream.stop_stream()
        stream.close()
        p.terminate()
        print("Stream resources released.")
    except Exception as e:
        print(f"Error during stream cleanup: {e}")


@sio.on("response")
def response(data):
    if data["text"]:
        print(data["text"])


sio.connect("http://localhost:5000")

try:
    while True:
        audio = stream.read(320)
        sio.emit("audio", {"audio": audio, "sample_rate": 16000})

except KeyboardInterrupt:
    print("Program interrupted by user.")
finally:
    # Ensure cleanup even on exceptions
    disconnect()
