from typing import List

import arrow
from fastapi import Depends

from app.db.repositories.businesses import BusinessRepository
from app.db.repositories.items import ItemRepository
from app.models.domain.businesses import BusinessItem


class ItemService:
    def __init__(self, item_repository: ItemRepository = Depends(ItemRepository)):
        self.item_repository = item_repository

    def get_items(self, user_id: int, business_id: int) -> List[BusinessItem]:
        items = self.item_repository.get_items(user_id=user_id, business_id=business_id)
