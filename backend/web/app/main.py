from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.routes.api import api_router
from app.core.config import get_app_settings


def get_application() -> FastAPI:
    settings = get_app_settings()
    application = FastAPI(**settings.fastapi_kwargs)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(api_router)

    return application


app = get_application()
