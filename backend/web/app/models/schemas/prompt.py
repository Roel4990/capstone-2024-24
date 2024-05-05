from typing import Optional, List

from pydantic import BaseModel


class BusinessPrompt(BaseModel):
    question: str
    answer: str
    items: Optional[List[int]] = None


class BusinessPromptResponse(BaseModel):
    data: List[BusinessPrompt]


class BusinessPromptRequest(BaseModel):
    data: List[BusinessPrompt]
