from typing import List

from fastapi import Depends
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.db.dependencies import provide_db_session
from app.db.models.orders import Session as TblSession
from app.db.models.orders import SessionQuery as TblSessionQuery


class OrderRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def add_session_key(self, business_id: int, session_key: str) -> str:
        self._session.add(TblSession(business_id=business_id, id=session_key))
        self._session.commit()

        return session_key

    def get_session_queries(self, session_key: str) -> List[TblSessionQuery]:
        return (
            self._session.query(TblSessionQuery)
            .filter(
                and_(
                    TblSessionQuery.session_id == session_key,
                )
            )
            .order_by(TblSessionQuery.id)
            .all()
        )

    def add_session_query(self, session_key: str, query: str, response: str) -> None:
        entity = TblSessionQuery(session_id=session_key, query=query, response=response)
        self._session.add(entity)
        self._session.commit()

        return

    def is_exist_session(self, business_id: int, session_key: str) -> bool:
        return (
            self._session.query(TblSession)
            .filter(
                and_(
                    TblSession.business_id == business_id, TblSession.id == session_key
                )
            )
            .first()
            is not None
        )
