from typing import Optional

from pydantic import BaseModel, constr


class BusinessItem(BaseModel):
    id: int
    name: constr(min_length=1, max_length=100)
    description: str
    imageUrl: Optional[str]
    createdDatetime: str
    updatedDatetime: str


class BusinessListResponse(BaseModel):
    data: list[BusinessItem]


class BusinessCreateRequest(BaseModel):
    name: constr(min_length=1, max_length=100)
    description: str
    imageUrl: Optional[str]
