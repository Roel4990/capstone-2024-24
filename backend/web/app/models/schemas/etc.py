import arrow
from pydantic import BaseModel


class HealthCheckResponse(BaseModel):
    massage: str = "I'm OK."
    currentTime: str = ""

    def __init__(self):
        super().__init__()
        self.currentTime = arrow.utcnow().isoformat()
