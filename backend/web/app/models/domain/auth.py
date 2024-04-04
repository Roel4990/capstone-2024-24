from pydantic import BaseModel


class AuthToken(BaseModel):
    accessToken: str


class LoginInfo(BaseModel):
    username: str
    password: str
