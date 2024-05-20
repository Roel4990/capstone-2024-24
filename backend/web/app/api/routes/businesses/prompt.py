from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.prompt import (
    BusinessPrompt,
    BusinessPromptsResponse,
    BusinessPromptsRequest,
    BusinessPromptResponse,
    BusinessPromptResponseModel,
    BusinessPromptDeleteResponse,
)
from app.models.schemas.users import UserInLogin
from app.services.businesses.service import BusinessService

router = APIRouter()


@router.get("/business/{business_id}/prompt", name="businesses:get-prompts")
def get_business_prompts(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptsResponse:
    result = service.get_business_prompts(
        user_id=user_info.userId, business_id=business_id
    )
    print(result)

    return BusinessPromptsResponse(
        data=[BusinessPromptResponseModel(**item.dict()) for item in result]
    )


@router.post("/business/{business_id}/prompt", name="businesses:create-prompt")
def create_business_prompt(
    body: BusinessPromptsRequest,
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptsResponse:
    result = service.add_business_prompt(
        user_id=user_info.userId, business_id=business_id, prompts=body.data
    )

    return BusinessPromptsResponse(
        data=[BusinessPromptResponseModel(**item.dict()) for item in result]
    )


@router.get("/business/{business_id}/prompt/{prompt_id}", name="businesses:get-prompt")
def get_business_prompt(
    business_id: int,
    prompt_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptResponse:
    return BusinessPromptResponse(
        data=BusinessPromptResponseModel(
            **service.get_business_prompt(
                user_id=user_info.userId, business_id=business_id, prompt_id=prompt_id
            ).dict()
        )
    )


@router.put(
    "/business/{business_id}/prompt/{prompt_id}", name="businesses:edit-prompts"
)
def edit_business_prompt(
    body: BusinessPrompt,
    prompt_id: int,
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptResponse:
    return BusinessPromptResponse(
        data=BusinessPromptResponseModel(
            **service.modify_business_prompt(
                user_id=user_info.userId,
                business_id=business_id,
                prompt_id=prompt_id,
                prompt=body,
            ).dict()
        )
    )


@router.delete(
    "/business/{business_id}/prompt/{prompt_id}", name="businesses:delete-prompts"
)
def delete_business_prompt(
    prompt_id: int,
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: BusinessService = Depends(BusinessService),
) -> BusinessPromptDeleteResponse:
    service.delete_business_prompt(
        user_id=user_info.userId, business_id=business_id, prompt_id=prompt_id
    )
    return BusinessPromptDeleteResponse()
