from typing import Optional

from pydantic import BaseModel


class BusinessItem(BaseModel):
    id: Optional[int] = None  # defined by the database
    name: str
    category: str
    description: str
    imageUrl: str
    prompt: str
    price: int
    isActive: bool


class Business(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    imageUrl: str
    createdDatetime: str
    updatedDatetime: str
