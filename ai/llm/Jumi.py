import json
import anthropic
import Prompt

from pydantic import BaseModel
from typing import List, Optional
import resultData_by_pydantic as dbt



# ======
# main
# ======
class Jumi():

    # init
    # input : str api(claude 3 sonnet api key), str shopInfo (형식을 맞춘 매장정보), str menuInfo (형식을 맞춘 메뉴정보)
    def __init__(self, api, shopInfo, menuInfo, additionalInfo):
        # api call
        self.client = anthropic.Anthropic(
                api_key = api)
        
        #basePrompt
        self.basePrompt = Prompt.basePrompt
        
        # 매장정보 프롬프트
        shopInfo = shopInfo.replace('\n',' ')
        shop = json.loads(shopInfo)

        self.shopPrompt = f'''
                너는 ‘{shop['name']}’이라는 식당의 손님응대를 위한 점원이야. 너의 이름은 ‘주미’야.

                ‘{shop['name']}’에 대한 설명은 ‘{shop['description']}’이야.
            '''

        # 메뉴정보 프롬프트
        self.menuPrompt = menuInfo

        # additionalInfo
        self.addedInfo = '''
          그리고 아래는 추가적인 정보야. 아래 내용은 현재 매장에서 제공하는 추가적인 요청이야. 
          question와 비슷한 내용의 질문이 들어오면 answer같이 response를 생성해줘.
          ''' + additionalInfo
        
        self.notion = '''
            어떤 대답이든 아래 형식을 꼭 지켜서 답해줘!
            {

              "response": "대답내용", 
              "orderInfo": { 
                  "items": [ 
                      { "id": 1, "quantity": 1 }, 
                  ] 
              }, 
              "pointerId": null,
              "doBilling": false,  
            "suggestItems": []

          }
          '''


    # jumiChat : 주미에게 질문을 하고 답변을 받는 함수
    # input : str query (질문내용과 장바구니정보가 담긴 데이터) 
    # output : str (주미의 형식에 맞춘 답변내용)
    def jumiChat(self, query, history):
        
        history.append({
                    "role": "user",
                    "content": query
                })

        # api통신
        message = self.client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1024,
            system = self.shopPrompt + self.basePrompt + self.menuPrompt + self.addedInfo + self.notion,
            messages= history
        )
        print(message.content[0].text)
        return self.makeResultToPydantic(message.content[0].text) 

    def makeResultToPydantic(self, resultMessage):
        try:
            message = json.loads(resultMessage)
        except:
            print('ERORR: result is not json')
        result = None
        #try:
        result = dbt.QueryResult(
                result = message['response'],
                orderInfo = dbt.OrderInfo(
                    items = [
                      dbt.OrderInfoItem(
                            id = item['id'], 
                            quantity = item['quantity']
                          ) 
                        for item in message['orderInfo']['items']
                    ]
                ),
                suggestItems = message['suggestItems'],
                pointerId = message['pointerId'],
                doBilling = message['doBilling'],

        )
        '''except Exception as e:
            print(f"ERROR: {e}")'''

        return result
        
    

#======
# test
#======

if __name__ == '__main__':
  shopinfotest = '''
  {
    "name": "미도인",
    "description": "강남점",
    "prompt": "우리 가게는 강남에 위치하고 있어. 스테이크 전문점이야. 매장 위치는 서울시 정릉로 22길 302이야."
  }
  '''

  menuinfotest = '''
  [
    {
      "category": "직원 호출",
      "items": [
        {
          "id": 25,
          "name": "물",
          "description": "",
          "prompt": "이건 물이야. 손님이 요청하면 준다고 해.",
          "price": 0
        },
        {
          "id": 26,
          "name": "숟가락",
          "description": "",
          "prompt": "이건 숟가락이야. 손님이 요청하면 준다고 해.",
          "price": 0
        }
      ]
    },
    {
      "category": "스테이크류",
      "items": [
        {
          "id": 27,
          "name": "트리플 스테이크",
          "description": "부드러운 부채살 스테이크, 메쉬 포테이토와 대파, 특제 와인소스의 세상에 없는 환상적인 조화",
          "prompt": "굽기를 물어보면, 굽기 조절 가능하다고 답해줘.",
          "price": 21000
        },
        {
          "id": 28,
          "name": "미도인 등심 스테이크",
          "description": "부드러운 등심 스테이크와 진한 육수로 우려낸 단호박 스프, 아지다마고의 한상차림",
          "prompt": "굽기를 물어보면, 굽기 조절 가능하다고 답해줘.",
          "price": 19000
        }
      ]
    },
    {
      "category": "덮밥류",
      "items": [
        {
          "id": 29,
          "name": "대창 덮밥",
          "description": "말이 필요 없는 맛. 잘 손질된 대창을 매콤한 특제 양념과 불맛나게 볶아낸 특별 덮밥",
          "prompt": "",
          "price": 12500
        },
        {
          "id": 30,
          "name": "대창 큐브 스테이크 덮밥",
          "description": "스테이크와 대창을 함께 즐길 수 있는 미도인만의 특별한 콜라보 메뉴",
          "prompt": "",
          "price": 13000
        },
        {
          "id": 31,
          "name": "화산 불백 덮밥",
          "description": "불맛 나는 돼지고기를 화산 모양으로 형상화한 비쥬얼 갑 강추 덮밥",
          "prompt": "",
          "price": 13000
        }
      ]
    },
    {
      "category": "음료 메뉴",
      "items": [
        {
          "id": 32,
          "name": "청포도 에이드",
          "description": "상큼한 청포도 에이드",
          "prompt": "청포도가 생으로 들어가있어.",
          "price": 7000
        },
        {
          "id": 33,
          "name": "복숭아 에이드",
          "description": "새콤달콤한 복숭아 에이드",
          "prompt": "복숭아가 생으로 들어가있어.",
          "price": 7000
        }
      ]
    }
  ]
  '''

  additiontest = '''
  [
    {
      "question": "화장실은 어디야?",
      "answer": "화장실은 나가서 왼쪽에 있습니다.",
      "items": null
    },
    {
      "question": "추천 메뉴는 뭐야?",
      "answer": "미도인 스테이크와 대창 덮밥입니다.",
      "items": [1,2]
    }
  ]
  '''


  #api키 넣어주세요
  api = input('enter your claude 3 sonnet api key. : ')

  #대화 선언
  jumi = Jumi(api, shopinfotest, menuinfotest, additiontest)


  historytest = [
    {
      "role": "user",
      "content": "청포도 에이드 한잔 줘"
    },
    {
      "role": "assistant",
      "content": "{\"response\": \"알겠습니다. 청포도 에이드 1잔을 장바구니에 담겠습니다.\",\"orderInfo\": {\"items\": [{\"id\": 32, \"quantity\": 1}]},\"pointerId\": 32, \"doBilling\": false}"
    },
    {
      "role": "user",
      "content": "주문한 거 다 없애줘"
    },
    {
      "role": "assistant",
      "content": "{\"response\": \"알겠습니다.\",\"orderInfo\": {\"items\": []},\"pointerId\": null, \"doBilling\": false}"
    }
  ]
  

  querytest = '''
  {
    "query": "아메리카노 하나 더 줘", 
    "orderInfo": { 
      "items": [
        {
          "id": 1, 
          "quantity": 1
        },
      ]
    }
  }
  '''



  #message출력
  print(jumi.jumiChat(querytest,historytest))
