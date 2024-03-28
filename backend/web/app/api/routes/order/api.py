from fastapi import APIRouter

from app.models.schemas.order import (
    SessionResponse,
    QueryResponse,
    QueryRequest,
    OrderInfo,
    OrderRequestInfo,
    BillingResponse,
)

router = APIRouter()


@router.get("/orders/{business-id}/prompt/new-session", name="order:get-new-session")
def get_new_session(business_id: int) -> SessionResponse:
    return SessionResponse(sessionId="TEMPORAL_SESSION_ID")


@router.post("/orders/{business-id}/prompt/{session-id}", name="order:post-prompt")
def post_prompt_response(
    business_id: int, session_id: str, body: QueryRequest
) -> QueryResponse:
    return QueryResponse(query="hello", orderInfo=OrderInfo(items=[]))


@router.put("/orders/{business-id}/billing/{session-id}", name="order:billing")
def put_billing_response(
    business_id: int, session_id: str, body: OrderRequestInfo
) -> BillingResponse:
    return BillingResponse(orderInfo=OrderInfo(items=[]))
