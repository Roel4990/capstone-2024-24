from typing import List

from fastapi import Depends, HTTPException
from starlette.status import HTTP_404_NOT_FOUND

from app.db.repositories.businesses import BusinessRepository
from app.db.repositories.items import ItemRepository
from app.models.domain.businesses import BusinessItem
from app.resouces.strings.businesses import BUSINESS_NOT_FOUNT


class ItemService:
    def __init__(
        self,
        item_repository: ItemRepository = Depends(ItemRepository),
        business_repository: BusinessRepository = Depends(BusinessRepository),
    ):
        self.item_repository = item_repository
        self.business_repository = business_repository

    def get_items(self, user_id: int, business_id: int) -> List[BusinessItem]:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        return self.item_repository.get_items(business_id=business_id)

    def put_items(
        self, user_id: int, business_id: int, items: List[BusinessItem]
    ) -> List[BusinessItem]:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        self.item_repository.delete_items(business_id=business_id)
        self.item_repository.put_items(business_id=business_id, items=items)

        return self.get_items(user_id=user_id, business_id=business_id)
