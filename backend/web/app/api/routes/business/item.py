from fastapi import APIRouter

from app.models.schemas.items import ItemCreateRequest, MenuResponse

router = APIRouter()


@router.post("/business/{business_id}/items", name="items:edit")
def create_items(business_id: int, body: ItemCreateRequest) -> MenuResponse:
    return MenuResponse(data=[])


@router.get("/business/{business_id}/items", name="items:list")
def get_items(business_id: int) -> MenuResponse:
    return MenuResponse(data=[])
