from typing import List

from fastapi import Depends
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.db.dependencies import provide_db_session
from app.db.models.items import Item as TblItem
from app.models.domain.businesses import BusinessItem


class ItemRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_items(self, business_id: int) -> List[BusinessItem]:
        entities = (
            self._session.query(TblItem)
            .filter(and_(TblItem.business_id == business_id, TblItem.status == 1))
            .order_by(TblItem.id)
            .all()
        )

        result: List[BusinessItem] = []

        for entity in entities:
            result.append(
                BusinessItem(
                    id=entity.custom_id,
                    category=entity.category,
                    name=entity.name,
                    description=entity.description,
                    prompt=entity.prompt_text,
                    imageUrl=entity.image_url,
                    price=entity.price,
                    isActive=bool(entity.status),
                )
            )

        return result

    def delete_items(self, business_id: int) -> None:
        self._session.query(TblItem).filter(TblItem.business_id == business_id).update(
            {TblItem.status: 0}
        )
        self._session.commit()

    def put_items(self, business_id: int, items: List[BusinessItem]) -> None:
        entities: List[TblItem] = []
        for item in items:
            entity = TblItem(
                business_id=business_id,
                category=item.category,
                name=item.name,
                description=item.description,
                prompt_text=item.prompt,
                image_url=item.imageUrl,
                price=item.price,
                status=int(item.isActive),
                custom_id=item.id,
            )
            entities.append(entity)

        self._session.bulk_save_objects(entities)
        self._session.commit()
