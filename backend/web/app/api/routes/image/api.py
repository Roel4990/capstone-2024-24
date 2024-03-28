from uuid import uuid4

from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.post("/image-upload", name="image:upload-image")
async def upload_image(file: UploadFile = File(...)):
    file_name = f"{uuid4()}.jpeg"
    return {"filename": file_name}
