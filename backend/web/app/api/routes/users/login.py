from fastapi import APIRouter, Depends

from app.models.domain.auth import LoginInfo
from app.models.schemas.users import UserLoginRequest, UserLoginResponse
from app.services.auth.service import AuthService

router = APIRouter()


@router.post("/login", name="auth:login")
def login(
    body: UserLoginRequest, auth_service: AuthService = Depends(AuthService)
) -> UserLoginResponse:
    token = auth_service.login_user(login_info=LoginInfo(**body.dict()))
    return UserLoginResponse(token=UserLoginResponse.Token(**token.dict()))


@router.post("/signup", name="auth:signup")
def signup(
    body: UserLoginRequest, auth_service: AuthService = Depends(AuthService)
) -> UserLoginResponse:
    # TODO: Add Auth Logic
    token = auth_service.login_user(login_info=LoginInfo(**body.dict()))
    return UserLoginResponse(token=UserLoginResponse.Token(**token.dict()))
