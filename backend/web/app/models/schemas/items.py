from typing import Optional

from pydantic import BaseModel


class ItemResponse(BaseModel):
    id: int
    name: str
    description: str
    imageUrl: Optional[str] = None
    prompt: str
    price: int
    isActive: bool = True


class CategoryResponse(BaseModel):
    category: str
    items: list[ItemResponse]


class MenuResponse(BaseModel):
    data: list[CategoryResponse]


class ItemRequest(BaseModel):
    id: int
    name: str
    description: str
    imageUrl: Optional[str] = None
    prompt: str
    price: int
    isActive: bool = True


class CategoryRequest(BaseModel):
    category: str
    items: list[ItemRequest]


class ItemCreateRequest(BaseModel):
    data: list[CategoryRequest]
