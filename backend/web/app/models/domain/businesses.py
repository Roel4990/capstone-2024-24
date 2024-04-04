from typing import Optional

from pydantic import BaseModel


class BusinessItem(BaseModel):
    id: int
    name: str
    description: str
    imageUrl: Optional[str]
    createdDatetime: str
    updatedDatetime: str
