from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.items import ItemCreateRequest, MenuResponse
from app.models.schemas.users import UserInLogin

router = APIRouter()


@router.post("/business/{business_id}/items", name="items:edit")
def create_items(
    business_id: int,
    body: ItemCreateRequest,
    user_info: UserInLogin = Depends(get_user_info),
) -> MenuResponse:
    return MenuResponse(data=[])


@router.get("/business/{business_id}/items", name="items:list")
def get_items(
    business_id: int, user_info: UserInLogin = Depends(get_user_info)
) -> MenuResponse:
    return MenuResponse(data=[])
