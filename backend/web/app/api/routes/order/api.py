import uuid

from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schemas.order import (
    SessionResponse,
    QueryResponse,
    QueryRequest,
    OrderInfo,
    OrderRequestInfo,
    BillingResponse,
)
from app.models.schemas.users import UserInLogin

router = APIRouter()


@router.get("/orders/{business-id}/prompt/new-session", name="order:get-new-session")
def get_new_session(
    business_id: int, user_info: UserInLogin = Depends(get_user_info)
) -> SessionResponse:
    return SessionResponse(sessionId=str(uuid.uuid4()))


@router.post("/orders/{business-id}/prompt/{session-id}", name="order:post-prompt")
def post_prompt_response(
    business_id: int,
    session_id: str,
    body: QueryRequest,
    user_info: UserInLogin = Depends(get_user_info),
) -> QueryResponse:
    return QueryResponse(query="hello", orderInfo=OrderInfo(items=[]))


@router.put("/orders/{business-id}/billing/{session-id}", name="order:billing")
def put_billing_response(
    business_id: int,
    session_id: str,
    body: OrderRequestInfo,
    user_info: UserInLogin = Depends(get_user_info),
) -> BillingResponse:
    return BillingResponse(orderInfo=OrderInfo(items=[]))
