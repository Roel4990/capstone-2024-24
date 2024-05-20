import json
import random
import uuid
from typing import List, Dict

from fastapi import Depends, HTTPException
from starlette.status import HTTP_404_NOT_FOUND

from app.db.repositories.businesses import BusinessRepository
from app.db.repositories.items import ItemRepository
from app.db.repositories.orders import OrderRepository
from app.models.domain.businesses import BusinessItem
from app.models.domain.items import OrderInfoItem, QueryResult, OrderInfo
from app.models.domain.orders import ModelQuery
from app.models.schemas.order import SuggestItem
from app.resouces.strings.businesses import BUSINESS_NOT_FOUNT
from app.resouces.strings.orders import SESSION_NOT_FOUND
from app.resouces.strings.prompt import CLAUDE_STATIC_PROMPT
from app.services.prompt.client import Client


class OrderService:
    def __init__(
        self,
        item_repository: ItemRepository = Depends(ItemRepository),
        business_repository: BusinessRepository = Depends(BusinessRepository),
        order_repository: OrderRepository = Depends(OrderRepository),
        client: Client = Depends(Client),
    ):
        self.item_repository = item_repository
        self.business_repository = business_repository
        self.order_repository = order_repository
        self.client = client

    def get_session_key(self, user_id: int, business_id: int) -> str:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        session_key = str(uuid.uuid4())

        self.order_repository.add_session_key(
            business_id=business_id, session_key=session_key
        )

        return session_key

    def get_items(self, user_id: int, business_id: int) -> List[Dict]:
        # TODO: services/items.py 와 중복 코드임. 추후 리팩토링 필요
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        return [
            x.dict() for x in self.item_repository.get_items(business_id=business_id)
        ]

    def post_query_to_model(
        self, user_id: int, business_id: int, session_id: str, query: str
    ) -> QueryResult:
        if not self.order_repository.is_exist_session(
            business_id=business_id, session_key=session_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=SESSION_NOT_FOUND
            )

        business = None

        for entity in self.business_repository.get_businesses(user_id=user_id):
            if entity.id == business_id:
                business = entity

        if business is None:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        shop_info = f"""너는 '{business.name}'이라는 식당의 손님 응대를 위한 점원이야. 너의 이름은 '주미'야.
            '{business.name}'에 대한 설명은 '{business.prompt}' 랑, '{business.description}'이야."""

        items_info = json.dumps(
            self.get_items(user_id=user_id, business_id=business_id)
        )

        query_histories = [
            ModelQuery(query=x.query, response=x.response)
            for x in self.order_repository.get_session_queries(session_key=session_id)
        ]

        import threading

        def perform_function_five_times(func, *args, **kwargs):
            results = []
            threads = []

            def wrapper():
                result = func(*args, **kwargs)
                results.append(result)

            for _ in range(4):
                thread = threading.Thread(target=wrapper)
                threads.append(thread)
                thread.start()

            for thread in threads:
                thread.join()

            return results

        # 함수 호출

        responses = perform_function_five_times(
            self.client.send_query,
            CLAUDE_STATIC_PROMPT,
            query_histories,
            query,
        )

        response = None
        order_items = None
        pointer_id = -1

        for message in responses:
            try:
                data = json.loads(message)

                response = data["response"]
                order_items = data["orderInfo"]["items"]
                pointer_id = data["pointerId"]

                break

            except Exception as e:
                print(e)
                pass

        if response is None or order_items is None or pointer_id == -1:
            raise HTTPException(status_code=504, detail="Response not found")

        self.order_repository.add_session_query(
            session_key=session_id,
            query=query,
            response=response,
        )

        business_items = self.item_repository.get_items(business_id)

        order_info_items = self.get_order_info(order_items, business_items)

        random_suggest_items = random.sample(business_items, 3)

        return QueryResult(
            result=response,
            suggestItems=(
                [
                    SuggestItem(
                        id=x.id, name=x.name, price=x.price, imageUrl=x.imageUrl
                    )
                    for x in random_suggest_items
                    if x.imageUrl is not None
                ]
                if "추천" in query or "추천" in response
                else []
            ),
            orderInfo=OrderInfo(items=order_info_items),
            pointerId=pointer_id,
            doBilling=False,
            showOrderList=False,
            totalPrice=sum([x.price * x.quantity for x in order_info_items]),
        )

    @staticmethod
    def get_order_info(
        order_items: List[Dict], order_entity: List[BusinessItem]
    ) -> List[OrderInfoItem]:
        result = []

        for order_item in order_items:
            for entity in order_entity:
                if order_item["id"] == entity.id:
                    result.append(
                        OrderInfoItem(
                            id=entity.id,
                            category=entity.category,
                            name=entity.name,
                            price=entity.price,
                            quantity=order_item["quantity"],
                        )
                    )

        return result
