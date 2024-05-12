from typing import Any, Dict, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class AppSettings(BaseSettings):

    DEBUG: bool = False
    REDOC_URL: Optional[str] = None
    DOCS_URL: Optional[str] = None
    TITLE: str = "Jumi API"
    DESCRIPTION: str = "Jumi API Open API Docs"
    VERSION: str = "1.0.0"

    # prod
    JWT_CREDENTIAL: str
    AWS_SECRET_KEY: str
    AWS_KEY_ID: str
    WRITE_DB_URL: str
    ANTHROPIC_KEY: str

    class Config:
        env_file = ".env"

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
