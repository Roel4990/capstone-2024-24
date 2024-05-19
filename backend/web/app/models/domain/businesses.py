from typing import Optional

from pydantic import BaseModel


class BusinessItem(BaseModel):
    id: int  # defined by the user
    name: str
    category: str
    description: str
    imageUrl: Optional[str] = None
    prompt: Optional[str] = None
    price: int
    isActive: bool


class Business(BaseModel):
    id: Optional[int] = None
    name: str
    prompt: Optional[str] = None
    description: str
    imageUrl: str
    createdDatetime: str
    updatedDatetime: str


class BusinessPrompt(BaseModel):
    id: Optional[int] = None
    question: str
    answer: str
    items: Optional[list[int]] = None
