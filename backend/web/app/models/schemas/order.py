from typing import Optional

from pydantic import BaseModel


class SessionResponse(BaseModel):
    sessionId: str


class Item(BaseModel):
    id: int
    category: str
    name: str
    price: int
    quantity: int


class RequestItem(BaseModel):
    id: int
    quantity: int


class OrderInfo(BaseModel):
    items: list[Item]


class OrderRequestInfo(BaseModel):
    items: list[RequestItem]


class QueryResponse(BaseModel):
    query: str
    orderInfo: OrderInfo
    pointerId: Optional[int]
    doBilling: bool = False
    showOrderList: bool = False
    totalPrice: int = 0


class QueryRequest(BaseModel):
    query: str
    orderInfo: OrderRequestInfo


class BillingResponse(BaseModel):
    orderInfo: OrderInfo
    totalPrice: int = 0
