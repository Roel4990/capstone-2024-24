from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.operators import and_

from app.db.dependencies import provide_db_session
from app.db.models.items import Item as TblItem


class ItemRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_items(self, user_id: int, business_id: int) -> List[TblItem]:
        return (
            self._session.query(TblItem)
            .filter(
                and_(
                    TblItem.business_id == business_id,
                    TblItem.user_id == user_id,
                )
            )
            .all()
        )
