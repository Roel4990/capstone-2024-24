from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.business import (
    BusinessCreateRequest,
    BusinessListResponse,
    BusinessItem,
)
from app.models.schemas.users import UserInLogin

router = APIRouter()


@router.post("/business", name="business:create")
def create_business(
    body: BusinessCreateRequest, user_info: UserInLogin = Depends(get_user_info)
) -> BusinessListResponse:
    return BusinessListResponse(
        data=[
            BusinessItem(
                id=1,
                name="미도인",
                description="강남점",
                imageUrl="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg",
                createdDatetime="2024-03-19T01:33:44Z",
                updatedDatetime="2024-03-19T01:33:44Z",
            )
        ]
    )


@router.get("/business", name="business:list")
def get_business_list(
    user_info: UserInLogin = Depends(get_user_info),
) -> BusinessListResponse:
    return BusinessListResponse(
        data=[
            BusinessItem(
                id=1,
                name="미도인",
                description="강남점",
                imageUrl="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg",
                createdDatetime="2024-03-19T01:33:44Z",
                updatedDatetime="2024-03-19T01:33:44Z",
            ),
            BusinessItem(
                id=3,
                name="미도인",
                description="홍대점",
                imageUrl="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg",
                createdDatetime="2024-03-15T01:33:44Z",
                updatedDatetime="2024-03-15T01:33:44Z",
            ),
        ]
    )
