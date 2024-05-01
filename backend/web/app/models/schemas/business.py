from typing import Optional

from pydantic import BaseModel, constr


class BusinessItem(BaseModel):
    id: int
    name: constr(min_length=1, max_length=100)
    description: str
    prompt: Optional[str] = None
    imageUrl: Optional[str]
    createdDatetime: str
    updatedDatetime: str


class BusinessResponse(BaseModel):
    data: Optional[BusinessItem]


class BusinessListResponse(BaseModel):
    data: list[BusinessItem]


class BusinessCreateRequest(BaseModel):
    name: constr(min_length=1, max_length=100)
    description: str
    prompt: str
    imageUrl: Optional[str]
