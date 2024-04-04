from typing import Optional

import arrow
from fastapi import Depends, HTTPException
from starlette.status import HTTP_404_NOT_FOUND

from app.db.repositories.users import UserRepository
from app.models.schemas.users import UserInfoResponse
from app.resouces.strings.users import USER_NOT_FOUNT
import hashlib


class UserService:
    def __init__(self, user_repository: UserRepository = Depends(UserRepository)):
        self.user_repository = user_repository

    def get_user_info(self, user_id: int) -> UserInfoResponse:
        user = self.user_repository.get_user(user_id=user_id)

        if not user:
            raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=USER_NOT_FOUNT)

        return UserInfoResponse(
            email=user.email,
            name=user.name,
            createdDatetime=arrow.get(user.created_datetime).isoformat(),
        )

    def add_user(self, username: str, email: str, password: str, status: int) -> None:
        # sha256 암호화
        if self.user_repository.is_exist_user(email=email):
            raise HTTPException(status_code=400, detail="User already exists")

        password_hash = hashlib.sha256(password.encode()).hexdigest()

        self.user_repository.add_user(
            username=username, email=email, password_hash=password_hash, status=status
        )

        return None
