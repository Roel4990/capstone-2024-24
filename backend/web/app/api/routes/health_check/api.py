from fastapi import APIRouter

from app.models.schemas.etc import HealthCheckResponse

router = APIRouter()


@router.get(
    "/health-check", name="server:health-check", response_model=HealthCheckResponse
)
def health_check() -> HealthCheckResponse:
    return HealthCheckResponse()
