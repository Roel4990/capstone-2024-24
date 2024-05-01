from typing import Optional

from fastapi import HTTPException
from fastapi.openapi.models import SecurityBase as SecurityBaseModel
from fastapi.security.base import SecurityBase
from fastapi.security.utils import get_authorization_scheme_param
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

from app.resouces.strings.auth import WRONG_TOKEN_PREFIX


class BearerAuth(SecurityBase):
    def __init__(self, scheme_name: str = None):
        self.scheme_name = scheme_name or self.__class__.__name__
        self.model = SecurityBaseModel(type="http")

    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)

        if authorization and scheme.lower() != "bearer":
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail=WRONG_TOKEN_PREFIX
            )

        return param or None


bearer_auth = BearerAuth()
