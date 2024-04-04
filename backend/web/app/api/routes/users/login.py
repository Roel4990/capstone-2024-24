from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.domain.auth import LoginInfo
from app.models.schemas.users import (
    UserLoginRequest,
    UserLoginResponse,
    UserInfoResponse,
    UserInLogin,
)
from app.services.auth.service import AuthService
from app.services.users.service import UserService

router = APIRouter()


@router.post("/login", name="auth:login")
def login(
    body: UserLoginRequest, auth_service: AuthService = Depends(AuthService)
) -> UserLoginResponse:
    token = auth_service.login_user(login_info=LoginInfo(**body.dict()))
    return UserLoginResponse(token=UserLoginResponse.Token(**token.dict()))


@router.post("/signup", name="auth:signup")
def signup(
    body: UserLoginRequest,
    auth_service: AuthService = Depends(AuthService),
    user_service: UserService = Depends(UserService),
) -> UserLoginResponse:
    user_service.add_user(
        username=body.username, email=body.username, password=body.password, status=1
    )

    token = auth_service.login_user(login_info=LoginInfo(**body.dict()))
    return UserLoginResponse(token=UserLoginResponse.Token(**token.dict()))


@router.get("/me", name="auth:me")
def me(
    user_service: UserService = Depends(UserService),
    user_info: UserInLogin = Depends(get_user_info),
) -> UserInfoResponse:
    return user_service.get_user_info(user_id=user_info.userId)
