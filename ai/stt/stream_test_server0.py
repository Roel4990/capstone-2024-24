import socket
import threading
import pyaudio

import VAD_STT as au
stt = au.VADAudio(input_rate=16000)

# PyAudio 설정
CHUNK = 640
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000

# 소켓 설정
HOST = 'localhost'
PORT = 55570


# 소켓 생성 및 바인딩
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((HOST, PORT))
server_socket.listen(1)
print(f"서버가 {HOST}:{PORT}에서 대기 중입니다...")

conn, addr = server_socket.accept()
print(f"{addr}에서 연결됨")


def receive_audio():
    while True:
        try:
            data = conn.recv(CHUNK)
            if not data:
                continue
            text = stt.vad_collector(data)
            
            if text:
                conn.sendall(text.encode('utf-8'))
                print("Sending text data to client")
        except Exception as e:
            print(f"ERROR! {e}")

receive_thread = threading.Thread(target=receive_audio)


receive_thread.start()

receive_thread.join()


# 종료처리
p.terminate()
conn.close()
server_socket.close()
