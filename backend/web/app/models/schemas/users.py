from typing import Optional

from pydantic import BaseModel, constr


class UserLoginRequest(BaseModel):
    username: constr(min_length=4, max_length=20)
    password: constr(min_length=6, max_length=20)


class UserLoginResponse(BaseModel):
    class Token(BaseModel):
        accessToken: str

    token: Token


class UserSignUpRequest(BaseModel):
    id: constr(min_length=4, max_length=20)
    password: constr(min_length=6, max_length=20)
    businessNumber: Optional[str]
