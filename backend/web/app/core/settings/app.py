from typing import Any, Dict, Optional

from pydantic_settings import BaseSettings


class AppSettings(BaseSettings):
    DEBUG: bool = False
    REDOC_URL: Optional[str] = "/redoc"
    DOCS_URL: Optional[str] = "/docs"
    TITLE: str = "Nonamed API"
    DESCRIPTION: str = "Nonamed API Open API Docs"
    VERSION: str = "1.0.0"

    # prod
    # JWT_CREDENTIAL: str
    # WRITE_DB_URL: str
    AWS_KEY_ID: str = "temp"
    AWS_SECRET_KEY: str = "temp"

    @property
    def fastapi_kwargs(self) -> Dict[str, Any]:
        return {
            "debug": self.DEBUG,
            "docs_url": self.DOCS_URL,
            "redoc_url": self.REDOC_URL,
            "title": self.TITLE,
            "version": self.VERSION,
            "description": self.DESCRIPTION,
        }
