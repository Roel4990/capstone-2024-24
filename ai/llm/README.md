# 사용법 (환경세팅)

## 세팅
anaconda 환경을 권고합니다. 
 
```
conda install anthropic 
conda install json
```

## class jumi(str, str, str) (설명)
### init
- input : str api, str shopInfo, str menuInfo
    - str api : claude 3 sonnet api key
    - str shopInfo : 매장정보
    ```
    {
      "name": "미도인",
      "description": "홍대점"
    }
    ```
    - str menuinfo : 메뉴정보
    ```
    {
        "data": [
            {
            "category": "Coffee", // 카테고리
            "items": [
                {
                    "id": 1,
                    "name": "아메리카노",
                    "description": "기본적인 커피입니다.",
                    "prompt": "콜림비아 원두 커피, 잘 어울리는 메뉴는 케이크 종류임. 딸기 케이크를 추천한다.", // 성능을 높이기 위해, 직원이 넣는 추가적인 스크립트 (손님에겐 보이지 않음)
                    "price": 5000, // 가격
                },
                {
                "id": 2,
                "name": "라떼",
                "description": "라떼가 최고.",
                "prompt": "우유를 넣은 커피, 잘 어울리는 메뉴는 케이크 종류임. 딸기 케이크를 추천한다.",
                "price": 5500,
                }
            ]
            },
            {
            "category": "Cake",
            "items": [
                {
                "id": 3,
                "name": "딸기 케이크",
                "prompt": "잘 어울리는 메뉴는 아메리카노.",
                "price": 7000,
                }
            ]
            }
        ]
    }
    ```
### jumiChat(str)
- input : str query
    - query : 사용자의 질의(와 장바구니 등 현재 화면 정보)
        ```
        {
            "query": "아메리카노 하나 더 줘", // 손님이 질문한 문장
            "orderInfo": { // 현재까지의 장바구니 정보.
                "items": [
                {
                    "id": 1, // item ID
                    "quantity": 1 // quantity in ordering
                },
                {
                    "id": 3,
                    "quantity": 1
                }
                ]
            }
        }
        ```

- output : str 
    - 주미의 답변내용
    ```
    {
        "response": "아메리카노 하나 더 드릴게요", // LLM이 제공할 예시 응답
        "orderInfo": { // LLM이 쿼리를 바탕으로 업데이트한 장바구니 정보
            "items": [
            {
                "id": 1, 
                "quantity": 2
            },
            {
                "id": 3,
                "quantity": 1
            }
            ]
        },
        "pointerId": 1, // 안드로이드에서 어떤 메뉴를 가리킬지 나타내는 필드. 가리킬 게 없으면 null로 주시면 됩니다.
            }
    ```
