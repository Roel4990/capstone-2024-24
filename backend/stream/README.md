
# 음성 처리 소켓 서버
Proof of Concept을 위한 소켓 서버

ubuntu 22.04 LTS, python 3.9, virtualenv 에서 테스트 됨.

### 의존성 설치
의존성이 맞지 않을 경우, requirements.txt 를 수정해서 설치할 수 있음. 
```
pip install -r requirements.txt
```

### 소켓 서버 실행
```
python main.py
```

### 엔드포인트
```
http://{hostname}

송신 (지속적으로 음성을 전송해야 함)
{'audio', {'audio': {bytesteam, eg. audio.tobytes()}, 'sample_rate': 44100}}

수신 (들어온 음성을 인식했을 때 텍스트로 응답)
{'response', {'text': '추천 메뉴 하나 줘.'}}
```

### (선택) 테스트 클라이언트 실행
```
python test_client.py
```
