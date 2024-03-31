from fastapi import APIRouter

from app.models.schemas.users import UserLoginRequest, UserLoginResponse

router = APIRouter()


@router.post("/login", name="auth:login")
def login(body: UserLoginRequest) -> UserLoginResponse:
    # TODO: Add Auth Logic
    return UserLoginResponse(token=UserLoginResponse.Token(accessToken="TEMPORAL_JWT"))


@router.post("/signup", name="auth:signup")
def signup(body: UserLoginRequest) -> UserLoginResponse:
    # TODO: Add Auth Logic
    return UserLoginResponse(token=UserLoginResponse.Token(accessToken="TEMPORAL_JWT"))
