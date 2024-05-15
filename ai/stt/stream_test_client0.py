import socket
import threading
import pyaudio

# PyAudio 설정
CHUNK = 640
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000

# 소켓 설정
HOST = 'localhost'
PORT = 55570

# PyAudio 스트림 초기화
p = pyaudio.PyAudio()
input_stream = p.open(format=FORMAT,
                      channels=CHANNELS,
                      rate=RATE,
                      input=True,
                      frames_per_buffer=CHUNK)

# 소켓 생성 및 연결
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))

def send_audio():
    while True:
        try:
            data = input_stream.read(CHUNK)
            client_socket.sendall(data)
        except Exception as e:
            print(f"ERROR! {e}")

def receive_text():
    while True:
        try:
            data = client_socket.recv(1024)
            print("taking text data to server")
            if not data:
                break
            print(f"서버로부터 받은 메시지: {data.decode('utf-8')}")
        except Exception as e:
            print(f"ERROR! {e}")

send_thread = threading.Thread(target=send_audio)
receive_thread = threading.Thread(target=receive_text)

send_thread.start()
receive_thread.start()

send_thread.join()
receive_thread.join()

# 종료 처리
input_stream.stop_stream()
input_stream.close()
p.terminate()
client_socket.close()
