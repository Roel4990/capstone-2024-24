from typing import Optional

from pydantic import BaseModel


class Items(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
    imageUrl: Optional[str]
    prompt: Optional[str]
    price: Optional[int]
    isActive: bool = True
