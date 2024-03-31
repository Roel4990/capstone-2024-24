from functools import lru_cache

from app.core.settings.app import AppSettings


@lru_cache
def get_app_settings() -> AppSettings:
    # TODO: 필요시 Production, Test Config 분리
    return AppSettings()
