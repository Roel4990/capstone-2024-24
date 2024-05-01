from typing import List, Optional

import arrow
from fastapi import Depends

from app.db.repositories.businesses import BusinessRepository
from app.models.domain.businesses import Business


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
