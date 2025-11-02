from pydantic_settings import BaseSettings


class AppSettings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str
    POSTGRES_SCHEMA: str = ""
    DEBUG: bool = True # Set to False in prod
    POOL_SIZE: int = 5
    POOL_RECYCLE: int = 3600
    MAX_OVERFLOW: int = 10

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


app_env_settings = AppSettings()
