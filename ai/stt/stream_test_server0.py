import socket
import threading
import sys

import VAD_STT as au
stt = au.VADAudio(input_rate=16000)

# PyAudio 설정
CHUNK = 640

# 소켓 설정
HOST = 'localhost'
PORT = 55570

#소리크기
VOLUME = 1500


# 소켓 생성 및 바인딩
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((HOST, PORT))
server_socket.listen(5)
print(f"서버가 {HOST}:{PORT}에서 대기 중입니다... (서버종료키 'q' enter)")



def receive_audio(conn, addr):
    print(f"Connected by {addr}")
    try:
        while True:
            data = conn.recv(CHUNK)
            if not data:
                break
            text = stt.vad_collector(data, VOLUME)
            
            if text:
                conn.sendall(text.encode('utf-8'))
                print("Sending text data to client")
    except Exception as e:
        print(f"ERROR! {e}")
    finally:
        conn.close()
        print(f"Connection with {addr} closed")


# 종료 명령 감지
def exit_monitor():
    while True:
        if input() == 'q':
            print("서버 종료 중...")
            server_socket.close()
            print("successly closing server socket")
            sys.exit()

# 종료 모니터 스레드
exit_thread = threading.Thread(target=exit_monitor)
exit_thread.daemon = True
exit_thread.start()

# 클라이언트 연결 수락
try:
    while True:
        conn, addr = server_socket.accept()
        client_thread = threading.Thread(target=receive_audio, args=(conn, addr))
        client_thread.start()
except Exception as e:
    print("Server error:", e)
finally:
    server_socket.close()
    print("Server has been closed")