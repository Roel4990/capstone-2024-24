from fastapi import APIRouter

from app.api.routes.businesses.business import router as business_router
from app.api.routes.businesses.item import router as item_router
from app.api.routes.health_check.api import router as health_check_router
from app.api.routes.image.api import router as image_router
from app.api.routes.order.api import router as order_router
from app.api.routes.users.login import router as login_router
from app.api.routes.businesses.prompt import router as business_prompt_router

api_router = APIRouter()
api_router.include_router(health_check_router, tags=["server"], prefix="/v1")
api_router.include_router(login_router, tags=["auth"], prefix="/v1")
api_router.include_router(business_router, tags=["businesses"], prefix="/v1")
api_router.include_router(item_router, tags=["items"], prefix="/v1")
api_router.include_router(business_prompt_router, tags=["주미 학습하기"], prefix="/v1")
api_router.include_router(order_router, tags=["orders"], prefix="/v1")
api_router.include_router(image_router, tags=["images"], prefix="/v1")
