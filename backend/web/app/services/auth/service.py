import hashlib
from datetime import timedelta

import arrow
import jwt
from fastapi import Depends, HTTPException
from starlette.status import HTTP_403_FORBIDDEN

from app.core.config import get_app_settings
from app.db.repositories.users import UserRepository
from app.models.domain.auth import AuthToken, LoginInfo
from app.resouces.numbers.auth import ACCESS_TOKEN_EXPIRE_MINUTES
from app.resouces.strings.auth import JWT_ALGORITHMS


class AuthService:
    def __init__(
        self,
        settings=Depends(get_app_settings),
        user_repository=Depends(UserRepository),
    ):
        self.jwt_credential = settings.JWT_CREDENTIAL
        self.user_repository = user_repository

    def login_user(self, login_info: LoginInfo) -> AuthToken:
        user = self.user_repository.get_user_by_email(email=login_info.username)

        if (
            not user
            or user.password != hashlib.sha256(login_info.password.encode()).hexdigest()
        ):
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN, detail="Invalid user or password"
            )

        return self.create_auth_token(
            user_id=user.id, user_email=login_info.username, status=1
        )

    def create_auth_token(
        self, user_id: int, user_email: str, status: int = 1
    ) -> AuthToken:
        access_token = self._create_jwt(
            user_id=user_id,
            user_email=user_email,
            status=status,
            expires=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
            token_type="accessToken",
        )

        return AuthToken(accessToken=access_token)

    def _create_jwt(
        self,
        user_id: int,
        user_email: str,
        status: int,
        expires: timedelta,
        token_type: str,
    ) -> str:
        now = arrow.utcnow()
        payload = {
            "aud": "JUMI",
            "iat": now.int_timestamp,
            "nbf": now.int_timestamp,
            "exp": (now + expires).int_timestamp,
            "typ": token_type,
            "userId": user_id,
            "userEmail": user_email,
            "status": status,
        }

        return jwt.encode(
            payload=payload, key=self.jwt_credential, algorithm=JWT_ALGORITHMS
        )
