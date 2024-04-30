from typing import Optional

from pydantic import BaseModel


class ModelQuery(BaseModel):
    query: str
    response: Optional[str] = None


class ShopInfo(BaseModel):
    name: str
    description: str
    prompt: str


class MenuInfo(BaseModel):
    items: list[dict]
