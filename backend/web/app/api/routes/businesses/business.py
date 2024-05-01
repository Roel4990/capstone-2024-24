from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.business import (
    BusinessCreateRequest,
    BusinessListResponse,
    BusinessItem,
    BusinessResponse,
)
from app.models.schemas.users import UserInLogin
from app.services.businesses.service import BusinessService

router = APIRouter()


@router.post("/business", name="businesses:create")
def create_business(
    body: BusinessCreateRequest,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessListResponse:
    service.add_business(
        user_id=user_info.userId,
        name=body.name,
        description=body.description,
        prompt=body.prompt,
        image_url=body.imageUrl,
    )

    result = service.get_businesses(user_id=user_info.userId)

    return BusinessListResponse(data=[BusinessItem(**item.dict()) for item in result])


@router.get("/business", name="businesses:list")
def get_businesses(
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessListResponse:
    result = service.get_businesses(user_id=user_info.userId)

    return BusinessListResponse(data=[BusinessItem(**item.dict()) for item in result])


@router.get("/business/{business_id}", name="business:get")
def get_business(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessResponse:
    result = service.get_business(user_id=user_info.userId, business_id=business_id)

    return BusinessResponse(data=BusinessItem(**result.dict()) if result else None)


@router.put("/business/{business_id}", name="business:update")
def update_business(
    business_id: int,
    body: BusinessCreateRequest,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessResponse:
    service.update_business(
        user_id=user_info.userId,
        business_id=business_id,
        name=body.name,
        description=body.description,
        prompt=body.prompt,
        image_url=body.imageUrl,
    )

    result = service.get_business(user_id=user_info.userId, business_id=business_id)

    return BusinessResponse(data=BusinessItem(**result.dict()) if result else None)


@router.delete("/business/{business_id}", name="business:delete")
def delete_business(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessListResponse:
    service.delete_business(user_id=user_info.userId, business_id=business_id)
    result = service.get_businesses(user_id=user_info.userId)

    return BusinessListResponse(data=[BusinessItem(**item.dict()) for item in result])
