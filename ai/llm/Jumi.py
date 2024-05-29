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
    "name": "주미네 우동집",
    "description": "국민대점",
    "prompt": "주미우동집은 1998년 1대 임호준 대표가 성북구 정릉동의 10평 작은 매장에서\n김밥, 우동, 짜장, 쫄면 네 가지의 메뉴로  영업을 시작하였습니다.\n김밥은 어머니가 집에서 만들어 주시던 맛을 재현하였고 우동은 오랜 시행착오를 거치며 멸치와 황태, 디포리 등으로 육수를 우려내고 밀가루를 직접 반죽하고 삶아 \n멸치육수와 함께 따끈한 우동 한 그릇을 만들어 영업을 했던 것이 모태가 되어 \n지금의 수제우동 전문점 주미우동집 (주) 물과소금 가맹사업본부로 발전되었습니다.\n40년 전의 우동집은 연탄난로와, 공중전화가 있었으며 손님이 직접 계산하고 \n음식을 가져다 드시는 방식이 현재까지 전통처럼 이어져오고 있습니다.\n현재는 같은 자리에서 2대 안세홍 대표가 이어받아 영업중이며 소문난 맛집으로 \n단골 손님들의 발걸음이 성황을 이루고 있습니다.\n오늘도 40년 전통 주미우동집을 찾아주신 고객님들께 고맙고 감사드리며 \n혼신을 다하여 청결과 정성으로 맛있는 우동 한 그릇을 만들어 올리겠습니다.\n\n감사합니다."
  }
  '''

  menuinfotest = '''
  [
        {
            "category": "김밥",
            "items": [
                {
                    "id": 2,
                    "name": "주미김밥",
                    "description": "기본김밥",
                    "prompt": "기본",
                    "price": 3000
                },
                {
                    "id": 3,
                    "name": "참치김밥",
                    "description": "참치가 들어간 김밥입니다.",
                    "prompt": "맛있는 참치김밥입니다.",
                    "price": 4000
                },
                {
                    "id": 1,
                    "name": "스팸김밥",
                    "description": "스팸이 들어간 김밥입니다.",
                    "prompt": "맛있는 스팸김밥입니다.",
                    "price": 4000
                },
                {
                    "id": 4,
                    "name": "크림치즈김밥",
                    "description": "크림치즈가 들어간 김밥입니다.",
                    "prompt": "크림치즈가 들어가서 고소한 맛이 일품입니다.",
                    "price": 5000
                }
            ]
        },
        {
            "category": "면류",
            "items": [
                {
                    "id": 12,
                    "name": "어묵우동",
                    "description": "어묵이 들어간 우동",
                    "prompt": "맛있어요",
                    "price": 7000
                },
                {
                    "id": 13,
                    "name": "얼큰우동",
                    "description": "얼큰한 우동",
                    "prompt": "얼큰해요",
                    "price": 6000
                },
                {
                    "id": 14,
                    "name": "열무국수",
                    "description": "열무가 들어간 국수",
                    "prompt": "얼큰해요",
                    "price": 7000
                },
                {
                    "id": 15,
                    "name": "잔치국수",
                    "description": "잔치국수",
                    "prompt": "맛있어요",
                    "price": 5000
                },
                {
                    "id": 9,
                    "name": "짜장면",
                    "description": "짜장면",
                    "prompt": "맛있어요",
                    "price": 6000
                },
                {
                    "id": 10,
                    "name": "콩국수",
                    "description": "콩국수",
                    "prompt": "여름별미입니다.",
                    "price": 6000
                },
                {
                    "id": 11,
                    "name": "비빔국수",
                    "description": "비빔국수입니다.",
                    "prompt": "맛있어요",
                    "price": 6000
                },
                {
                    "id": 8,
                    "name": "냉모밀",
                    "description": "냉모밀",
                    "prompt": "시원해요",
                    "price": 6000
                }
            ]
        },
        {
            "category": "돈까스",
            "items": [
                {
                    "id": 16,
                    "name": "주미돈까스",
                    "description": "맛있는 돈까스",
                    "prompt": "맛있어요",
                    "price": 8000
                },
                {
                    "id": 17,
                    "name": "치즈돈까스",
                    "description": "치즈가 들어간 돈까스",
                    "prompt": "맛있어요",
                    "price": 10000
                }
            ]
        },
        {
            "category": "만두",
            "items": [
                {
                    "id": 6,
                    "name": "주미만두",
                    "description": "김치고기반반 만두입니다.",
                    "prompt": "맛있어요,",
                    "price": 5000
                },
                {
                    "id": 5,
                    "name": "갈비만두",
                    "description": "갈비만두입니다.",
                    "prompt": "맛있어요",
                    "price": 4000
                },
                {
                    "id": 7,
                    "name": "매운갈비만두",
                    "description": "매운 갈비만두입니다.",
                    "prompt": "매워요",
                    "price": 5000
                }
            ]
        },
        {
            "category": "분식",
            "items": [
                {
                    "id": 19,
                    "name": "국물떡볶이",
                    "description": "국물 떡볶이입니다.",
                    "prompt": "맛있어요",
                    "price": 5000
                },
                {
                    "id": 18,
                    "name": "제육덮밥",
                    "description": "제육볶음이 들어간 덮밥입니다.",
                    "prompt": "맛있어요",
                    "price": 7000
                }
            ]
        }
    ]
  '''

  additiontest ='''
  [
        {
            "question": "화장실이 어디인가요?",
            "answer": "화장실은 건물 안 2층에 위치하고 있습니다.",
            "items": null,
            "id": 29
        },
        {
            "question": "매장에서 추천하는 메뉴가 무엇입니까?",
            "answer": "해당 매장에서 추천하는 메뉴는 어묵우동, 얼큰우동 입니다.",
            "items": [
                12,
                13
            ],
            "id": 28
        },
        {
            "question": "매장에 대해서 설명해주세요.",
            "answer": "저희 매장은 김밥, 우동, 돈까스, 만두 등 다양한 메뉴를 제공합니다. 월요일은 휴무이며, 영업시간은 오전 10시부터 오후 10시까지입니다.",
            "items": null,
            "id": 30
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
    "query": "계산할래", 
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
