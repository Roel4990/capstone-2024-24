from pydantic import BaseModel


class ImageResponse(BaseModel):
    imageUrl: str
