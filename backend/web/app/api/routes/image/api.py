from uuid import uuid4

import boto3
from botocore.exceptions import NoCredentialsError
from fastapi import APIRouter, UploadFile, File, Depends

from app.api.dependencies.credential import get_user_info
from app.core.config import get_app_settings
from app.models.schemas.image import ImageResponse
from app.models.schemas.users import UserInLogin

router = APIRouter()


@router.post("/image-upload", name="image:upload-image")
async def upload_image(
    file: UploadFile = File(...), user_info: UserInLogin = Depends(get_user_info)
) -> ImageResponse:
    file_id = f"{uuid4()}"
    config = get_app_settings()

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=config.AWS_KEY_ID,
        aws_secret_access_key=config.AWS_SECRET_KEY,
    )

    try:
        s3_client.upload_fileobj(
            file.file,
            "reborn-image-test",
            file_id + ".jpeg",
            ExtraArgs={"ContentDisposition": "inline", "ContentType": "image/jpeg"},
        )

    except NoCredentialsError:
        return {"message": "Credentials not available"}
    return ImageResponse(
        imageUrl="https://reborn-image-test.s3.ap-northeast-2.amazonaws.com/"
        + file_id
        + ".jpeg"
    )
