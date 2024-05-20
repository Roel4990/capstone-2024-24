from typing import Optional, List

from pydantic import BaseModel


class BusinessPrompt(BaseModel):
    question: str
    answer: str
    items: Optional[List[int]] = None


class BusinessPromptResponseModel(BusinessPrompt):
    id: int


class BusinessPromptsResponse(BaseModel):
    data: List[BusinessPromptResponseModel]


class BusinessPromptResponse(BaseModel):
    data: BusinessPromptResponseModel


class BusinessPromptsRequest(BaseModel):
    data: List[BusinessPrompt]


class BusinessPromptDeleteResponse(BaseModel):
    pass
