from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/portfolio"
    SECRET_KEY: str = "change-this-in-production-please-use-a-strong-random-key-32chars-min"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
