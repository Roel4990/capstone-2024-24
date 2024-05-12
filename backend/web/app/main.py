from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.routes.api import api_router
from app.core.config import get_app_settings
from app.db.dependencies import init_db
from fastapi.openapi.docs import (
    get_redoc_html,
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)


def get_application() -> FastAPI:
    settings = get_app_settings()
    application = FastAPI(**settings.fastapi_kwargs)
    init_db(settings.WRITE_DB_URL)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    WORKING_CDN = "unpkg.com"

    @application.get("/docs", include_in_schema=False)
    async def custom_swagger_ui_html():
        return get_swagger_ui_html(
            openapi_url=application.openapi_url,
            title=application.title + " - Swagger UI",
            oauth2_redirect_url=application.swagger_ui_oauth2_redirect_url,
            swagger_js_url=f"https://{WORKING_CDN}/swagger-ui-dist@5.9.0/swagger-ui-bundle.js",
            swagger_css_url=f"https://{WORKING_CDN}/swagger-ui-dist@5.9.0/swagger-ui.css",
        )

    @application.get(
        application.swagger_ui_oauth2_redirect_url, include_in_schema=False
    )
    async def swagger_ui_redirect():
        return get_swagger_ui_oauth2_redirect_html()

    @application.get("/redoc", include_in_schema=False)
    async def redoc_html():
        return get_redoc_html(
            openapi_url=app.openapi_url,
            title=application.title + " - ReDoc",
            redoc_js_url=f"https://{WORKING_CDN}/redoc@next/bundles/redoc.standalone.js",
        )

    application.include_router(api_router)

    return application


app = get_application()
