import openai
from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv
from flask_cors import CORS

# 환경 변수 파일 로드 및 API 키 설정
load_dotenv()
openai.api_key = os.environ.get('API_KEY')

app = Flask(__name__)
CORS(app)

@app.route('/prompt', methods=['POST'])
def generate_answer():
    try:
        data = request.json
        question = data['question']
        original_prompt = data['prompt']

        pre_prompt = f"고객님이 다음과 같이 물어봅니다: '{question}'. 이에 친절하게 응답하는 방식으로 안내해 주세요. 원래의 지시는 다음과 같습니다:\n\n{original_prompt}. 안녕하세요! 감사합니다!와 같은 추가적인 인사말은 덧붙이지 말아줘 그리고 소개시켜줘서 기쁘다 이런말도 빼, 그리고 최대한 간결한 답변으로 만들어줘. 마무리는 지어줘. 도움이 필요하시면 언제든 말씀해 주세요.와 같은 말은 하지 말아줘."
        # GPT-4 모델에 전달
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are a polite restaurant assistant who rephrases prompts into courteous responses."},
                {"role": "user", "content": pre_prompt}
            ],

            max_tokens=150,
            temperature=0.5
        )
        transformed_answer = response.choices[0].message.content.strip()
        return jsonify({'question': question, 'answer': transformed_answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
