from typing import Optional, List

from pydantic import BaseModel


class Items(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
    imageUrl: Optional[str]
    prompt: Optional[str]
    price: Optional[int]
    isActive: bool = True


class OrderInfoItem(BaseModel):
    id: int
    category: str
    name: str
    price: int
    quantity: int


class OrderInfo(BaseModel):
    items: List[OrderInfoItem] = []


class QueryResult(BaseModel):
    result: str
    suggestItems: List = []
    orderInfo: OrderInfo
    pointerId: Optional[int] = None
    doBilling: bool = False
    showOrderList: bool = False
    totalPrice: int = 0
