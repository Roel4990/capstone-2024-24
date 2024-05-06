import json
from typing import List

from fastapi import Depends
from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.sql.operators import eq

from app.db.dependencies import provide_db_session
from app.db.models.businesses import (
    Business as TblBusiness,
    BusinessPrompt as TblBusinessPrompt,
)
from app.models.domain.businesses import BusinessPrompt


class BusinessRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_businesses(self, user_id: int) -> List[TblBusiness]:
        return (
            self._session.query(TblBusiness)
            .filter(eq(TblBusiness.owner_user_id, user_id))
            .order_by(TblBusiness.id)
            .all()
        )

    def update_business(
        self,
        user_id: int,
        business_id: int,
        name: str,
        description: str,
        prompt: str,
        image_url: str,
    ) -> None:
        business = (
            self._session.query(TblBusiness)
            .filter(
                and_(
                    TblBusiness.owner_user_id == user_id, TblBusiness.id == business_id
                )
            )
            .first()
        )

        if business:
            business.name = name
            business.description = description
            business.prompt = prompt
            business.image_url = image_url

            self._session.commit()

        return None

    def is_exist_business(self, user_id: int, business_id: int) -> bool:
        return (
            self._session.query(TblBusiness)
            .filter(
                and_(
                    TblBusiness.owner_user_id == user_id, TblBusiness.id == business_id
                )
            )
            .first()
            is not None
        )

    def is_exist_business_prompt(self, business_id: int, prompt_id: int) -> bool:
        return (
            self._session.query(TblBusinessPrompt)
            .filter(
                and_(
                    TblBusinessPrompt.business_id == business_id,
                    TblBusinessPrompt.id == prompt_id,
                )
            )
            .first()
            is not None
        )

    def modify_business_prompt(
        self, business_id: int, prompt_id: int, prompt: BusinessPrompt
    ) -> BusinessPrompt:
        entity = (
            self._session.query(TblBusinessPrompt)
            .filter(
                and_(
                    TblBusinessPrompt.business_id == business_id,
                    TblBusinessPrompt.id == prompt_id,
                )
            )
            .first()
        )

        if entity:
            entity.prompt_text = json.dumps(prompt.dict(exclude={"id"}))
            self._session.commit()

        return prompt

    def delete_business_prompt(self, business_id: int, prompt_id: int) -> None:
        prompt = (
            self._session.query(TblBusinessPrompt)
            .filter(
                and_(
                    TblBusinessPrompt.business_id == business_id,
                    TblBusinessPrompt.id == prompt_id,
                )
            )
            .first()
        )

        if prompt:
            self._session.delete(prompt)
            self._session.commit()

        return None

    def add_business(
        self, user_id: int, name: str, description: str, image_url: str, prompt: str
    ) -> TblBusiness:
        business = TblBusiness(
            owner_user_id=user_id,
            name=name,
            prompt=prompt,
            description=description,
            image_url=image_url,
        )

        self._session.add(business)
        self._session.commit()

        return business

    def delete_business(self, user_id: int, business_id: int) -> None:
        business = (
            self._session.query(TblBusiness)
            .filter(
                and_(
                    TblBusiness.owner_user_id == user_id, TblBusiness.id == business_id
                )
            )
            .first()
        )

        if business:
            self._session.delete(business)
            self._session.commit()

        return None

    def get_business_prompts(self, business_id: int) -> List[BusinessPrompt]:
        items = (
            self._session.query(TblBusinessPrompt)
            .filter(eq(TblBusinessPrompt.business_id, business_id))
            .all()
        )
        result = []
        for item in items:
            prompt = json.loads(item.prompt_text)
            result.append(BusinessPrompt(id=item.id, **prompt))

        return result

    def add_business_prompt(
        self, business_id: int, prompts: List[BusinessPrompt]
    ) -> None:
        for prompt in prompts:
            prompt = TblBusinessPrompt(
                business_id=business_id,
                prompt_text=json.dumps(prompt.dict(exclude={"id"})),
            )
            self._session.add(prompt)

        self._session.commit()

        return None
