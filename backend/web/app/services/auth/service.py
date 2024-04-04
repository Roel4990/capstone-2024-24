from datetime import timedelta

import arrow
import jwt
from fastapi import Depends

from app.core.config import get_app_settings
from app.models.domain.auth import AuthToken, LoginInfo
from app.resouces.numbers.auth import ACCESS_TOKEN_EXPIRE_MINUTES
from app.resouces.strings.auth import JWT_ALGORITHMS


class AuthService:
    def __init__(self, settings=Depends(get_app_settings)):
        self.jwt_credential = settings.JWT_CREDENTIAL

    def login_user(self, login_info: LoginInfo) -> AuthToken:
        return self.create_auth_token(
            user_id=1, user_email=login_info.username, status=1
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
