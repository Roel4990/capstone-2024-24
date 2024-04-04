from typing import Optional

from fastapi import Depends
from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.sql.operators import eq

from app.db.dependencies import provide_db_session
from app.db.models.users import User as TblUser


class UserRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_user(self, user_id: int) -> Optional[TblUser]:
        return (
            self._session.query(TblUser)
            .filter(and_(TblUser.id == user_id, TblUser.status != 0))
            .first()
        )

    def get_user_by_email(self, email: str) -> Optional[TblUser]:
        return self._session.query(TblUser).filter(eq(TblUser.email, email)).first()

    def is_exist_user(self, email: str) -> bool:
        return (
            self._session.query(TblUser).filter(eq(TblUser.email, email)).first()
            is not None
        )

    def add_user(
        self, username: str, email: str, password_hash: str, status: int
    ) -> TblUser:
        user = TblUser(
            email=email,
            name=username,
            password=password_hash,
            status=status,
        )

        self._session.add(user)
        self._session.commit()

        return user
