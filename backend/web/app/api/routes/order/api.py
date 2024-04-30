from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.domain.items import QueryResult
from app.models.schemas.order import (
    SessionResponse,
    QueryResponse,
    QueryRequest,
    OrderInfo,
    OrderRequestInfo,
    BillingResponse,
    Item,
    SuggestItem,
)
from app.models.schemas.users import UserInLogin
from app.services.orders.service import OrderService

router = APIRouter()


@router.get("/orders/{business_id}/prompt/new-session", name="order:get-new-session")
def get_new_session(
    business_id: int,
    user_info: UserInLogin = Depends(get_user_info),
    service: OrderService = Depends(OrderService),
) -> SessionResponse:

    return SessionResponse(
        sessionId=service.get_session_key(
            user_id=user_info.userId, business_id=business_id
        )
    )


@router.post("/orders/{business_id}/prompt/{session_id}", name="order:post-prompt")
def post_prompt_response(
    business_id: int,
    session_id: str,
    body: QueryRequest,
    user_info: UserInLogin = Depends(get_user_info),
    service: OrderService = Depends(OrderService),
) -> QueryResponse:
    result: QueryResult = service.post_query_to_model(
        user_id=user_info.userId,
        business_id=business_id,
        session_id=session_id,
        query=body.query,
    )

    return QueryResponse(
        result=result.result,
        suggestItems=[SuggestItem(**x.dict()) for x in result.suggestItems],
        orderInfo=OrderInfo(items=[Item(**x.dict()) for x in result.orderInfo.items]),
        pointerId=result.pointerId,
        doBilling=result.doBilling,
        showOrderList=result.showOrderList,
        totalPrice=result.totalPrice,
    )


@router.put("/orders/{business_id}/billing/{session_id}", name="order:billing")
def put_billing_response(
    business_id: int,
    session_id: str,
    body: OrderRequestInfo,
    user_info: UserInLogin = Depends(get_user_info),
) -> BillingResponse:
    return BillingResponse(orderInfo=OrderInfo(items=[]))
