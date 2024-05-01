from typing import Dict, Any, Optional

import arrow
import jwt
from fastapi import Depends, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN

from app.api.dependencies.security_base import bearer_auth
from app.core.config import get_app_settings
from app.models.schemas.users import UserInLogin
from app.resouces.strings.auth import JWT_ALGORITHMS, MALFORMED_PAYLOAD, FORBIDDEN


def _token_decode(
    raw_token=Depends(bearer_auth), setting=Depends(get_app_settings)
) -> Optional[Dict[str, Any]]:
    if raw_token is None:
        return None

    try:
        token_data = jwt.decode(
            jwt=raw_token,
            key=setting.JWT_CREDENTIAL,
            audience="JUMI",
            algorithms=JWT_ALGORITHMS,
            options={"verify_exp": False},
        )

    except (jwt.DecodeError, jwt.PyJWTError):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )

    if token_data.get("exp", 0) < arrow.get().timestamp():
        if token_data.get("typ") == "refreshToken":
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
            )

        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )

    return token_data


def get_optional_user_info(
    decoded_token=Depends(_token_decode),
) -> Optional[UserInLogin]:
    if decoded_token is None:
        return None

    if decoded_token.get("typ", None) != "accessToken":
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )

    try:
        response = UserInLogin(**decoded_token)

        return response

    except Exception:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )


def get_user_info(decoded_token=Depends(_token_decode)) -> UserInLogin:
    if not decoded_token or decoded_token.get("typ", None) != "accessToken":
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )

    try:
        response = UserInLogin(**decoded_token)
        return response

    except Exception:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )


def validate_refresh_token(decoded_token=Depends(_token_decode)) -> UserInLogin:
    if not decoded_token or decoded_token.get("typ", None) != "refreshToken":
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )

    if decoded_token.get("status", None) != 1:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail=FORBIDDEN,
        )

    try:
        return UserInLogin(**decoded_token)

    except Exception:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=MALFORMED_PAYLOAD,
        )
