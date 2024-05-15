from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.prompt import (
    BusinessPrompt,
    BusinessPromptResponse,
    BusinessPromptRequest,
)
from app.models.schemas.users import UserInLogin
from app.services.businesses.service import BusinessService

router = APIRouter()


@router.get("/business/{business_id}/prompt", name="businesses:get-prompt")
def get_business_prompt(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptResponse:
    result = service.get_business_prompt(
        user_id=user_info.userId, business_id=business_id
    )

    return BusinessPromptResponse(
        data=[BusinessPrompt(**item.dict()) for item in result]
    )


@router.post("/business/{business_id}/prompt", name="businesses:edit-prompt")
def create_business_prompt(
    body: BusinessPromptRequest,
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptResponse:
    return BusinessPromptResponse(
        data=service.add_business_prompt(
            user_id=user_info.userId, business_id=business_id, prompts=body.data
        )
    )
