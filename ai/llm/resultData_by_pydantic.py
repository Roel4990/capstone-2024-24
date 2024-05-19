from typing import List, Optional
from pydantic import BaseModel

class OrderInfoItem(BaseModel):
    id: int
    quantity: int


class OrderInfo(BaseModel):
    items: List[OrderInfoItem] = []


class QueryResult(BaseModel):
    result: str
    suggestItems: List[int] = []
    orderInfo: OrderInfo
    pointerId: Optional[int] = None
    doBilling: bool = False

    