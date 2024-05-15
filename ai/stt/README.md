
# 파일 설명
## VAD_STT.py
vad와 stt를 사용하기 위한 파일.

본 파일만 실행시 현재 기기 마이크에 연결되어 결과를 출력하는 동작 수행

## stream_test_server0.py
실제 test stream 통신이 가능한 server파일

## stream_test_client0.py
실제 test stream 통신이 가능한 client파일

# 환경세팅
version
```
Python == 3.6.9
webrtcvad >= 2.0.10
torchaudio >= 0.8.1
torch >= 1.8.1
Soundfile >= 0.13.3
pyaudio >= 0.2.11
```

환경세팅 (VAD_STT.py)
```
pip install webrtcvad
pip install torchaudio
pip install torch
pip install numpy
pip install soundfile

pip install git+https://github.com/openai/whisper.git 
sudo apt install python3-pyaudio
 // conda install pyaudio 추천
 // pyaudio 참고 : https://pypi.org/project/PyAudio/
```


# 사용 모델
- py_webrtcvad : https://github.com/wiseman/py-webrtcvad
- silero-vad : https://github.com/snakers4/silero-vad?tab=readme-ov-file

- whisper : https://github.com/openai/whisper