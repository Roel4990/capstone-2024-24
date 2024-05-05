from typing import List

from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.domain.businesses import BusinessItem
from app.models.schemas.items import (
    ItemCreateRequest,
    MenuResponse,
    ItemResponse,
    CategoryResponse,
)
from app.models.schemas.users import UserInLogin
from app.services.items.service import ItemService

router = APIRouter()


@router.post("/business/{business_id}/items", name="items:edit")
def create_items(
    business_id: int,
    body: ItemCreateRequest,
    user_info: UserInLogin = Depends(get_user_info),
    service: ItemService = Depends(ItemService),
) -> MenuResponse:
    items = []
    for category in body.data:
        for item in category.items:
            items.append(
                BusinessItem(
                    id=item.id,
                    category=category.category,
                    name=item.name,
                    description=item.description,
                    imageUrl=item.imageUrl,
                    prompt=item.prompt,
                    price=item.price,
                    isActive=item.isActive,
                )
            )

    entities = service.put_items(
        user_id=user_info.userId, business_id=business_id, items=items
    )

    data: List[CategoryResponse] = []

    category = ""
    for entity in entities:
        if entity.category != category:
            category = entity.category
            data.append(CategoryResponse(category=category, items=[]))

        data[-1].items.append(
            ItemResponse(
                id=entity.id,
                name=entity.name,
                description=entity.description,
                imageUrl=entity.imageUrl,
                prompt=entity.prompt,
                price=entity.price,
                isActive=entity.isActive,
            )
        )

    return MenuResponse(data=data)


@router.get("/business/{business_id}/items", name="items:list")
def get_items(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service=Depends(ItemService),
) -> MenuResponse:
    entities = service.get_items(user_id=user_info.userId, business_id=business_id)

    data: List[CategoryResponse] = []

    category = ""
    for entity in entities:
        if entity.category != category:
            category = entity.category
            data.append(CategoryResponse(category=category, items=[]))
        data[-1].items.append(
            ItemResponse(
                id=entity.id,
                name=entity.name,
                description=entity.description,
                imageUrl=entity.imageUrl,
                prompt=entity.prompt,
                price=entity.price,
                isActive=entity.isActive,
            )
        )

    return MenuResponse(data=data)
