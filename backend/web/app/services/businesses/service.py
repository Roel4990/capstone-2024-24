from typing import List, Optional

import arrow
from fastapi import Depends, HTTPException
from starlette.status import HTTP_404_NOT_FOUND

from app.db.repositories.businesses import BusinessRepository
from app.models.domain.businesses import Business, BusinessPrompt
from app.resouces.strings.businesses import BUSINESS_NOT_FOUNT, PROMPT_NOT_FOUNT


class BusinessService:
    def __init__(
        self, business_repository: BusinessRepository = Depends(BusinessRepository)
    ):
        self.business_repository = business_repository

    def get_businesses(self, user_id: int) -> List[Business]:
        businesses = self.business_repository.get_businesses(user_id=user_id)
        result = []

        for business in businesses:
            result.append(
                Business(
                    id=business.id,
                    name=business.name,
                    prompt=business.prompt,
                    description=business.description,
                    imageUrl=business.image_url,
                    createdDatetime=arrow.get(business.created_datetime).isoformat(),
                    updatedDatetime=arrow.get(business.updated_datetime).isoformat(),
                )
            )

        return result

    def get_business(self, user_id: int, business_id: int) -> Optional[Business]:
        businesses = self.get_businesses(user_id=user_id)

        for business in businesses:
            if business.id == business_id:
                return business

        return None

    def update_business(
        self,
        user_id: int,
        business_id: int,
        name: str,
        description: str,
        prompt: str,
        image_url: str,
    ) -> None:
        self.business_repository.update_business(
            user_id=user_id,
            business_id=business_id,
            name=name,
            prompt=prompt,
            description=description,
            image_url=image_url,
        )

        return None

    def add_business(
        self,
        user_id: int,
        name: str,
        description: str,
        prompt: str,
        image_url: str,
    ) -> None:
        self.business_repository.add_business(
            user_id=user_id,
            name=name,
            prompt=prompt,
            description=description,
            image_url=image_url,
        )

        return None

    def delete_business(self, user_id: int, business_id: int) -> None:
        self.business_repository.delete_business(
            business_id=business_id, user_id=user_id
        )
        return None

    def get_business_prompts(
        self, user_id: int, business_id: int
    ) -> List[BusinessPrompt]:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        return self.business_repository.get_business_prompts(business_id=business_id)

    def get_business_prompt(
        self, user_id: int, business_id: int, prompt_id: int
    ) -> BusinessPrompt:
        item = self.get_business_prompts(user_id=user_id, business_id=business_id)

        for prompt in item:
            if prompt.id == prompt_id:
                return prompt

        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=PROMPT_NOT_FOUNT)

    def add_business_prompt(
        self, user_id: int, business_id: int, prompts: List[BusinessPrompt]
    ) -> List[BusinessPrompt]:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        self.business_repository.add_business_prompt(
            business_id=business_id, prompts=prompts
        )

        return self.get_business_prompts(user_id=user_id, business_id=business_id)

    def modify_business_prompt(
        self, user_id: int, business_id: int, prompt_id: int, prompt: BusinessPrompt
    ) -> BusinessPrompt:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        if not self.business_repository.is_exist_business_prompt(
            business_id=business_id, prompt_id=prompt_id
        ):
            raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=PROMPT_NOT_FOUNT)

        self.business_repository.modify_business_prompt(
            business_id=business_id, prompt_id=prompt_id, prompt=prompt
        )

        return self.get_business_prompt(
            user_id=user_id, business_id=business_id, prompt_id=prompt_id
        )

    def delete_business_prompt(
        self, user_id: int, business_id: int, prompt_id: int
    ) -> None:
        if not self.business_repository.is_exist_business(
            user_id=user_id, business_id=business_id
        ):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=BUSINESS_NOT_FOUNT
            )

        if not self.business_repository.is_exist_business_prompt(
            business_id=business_id, prompt_id=prompt_id
        ):
            raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=PROMPT_NOT_FOUNT)

        self.business_repository.delete_business_prompt(
            business_id=business_id, prompt_id=prompt_id
        )

        return None
