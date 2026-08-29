from pydantic_settings import BaseSettings , SettingsConfigDict

class Settings(BaseSettings):

    APP_NAME: str

    ENVIRONMENT: str

    PORT: int


    DATABASE_URL: str

    JWT_SECRET_KEY: str

    JWT_ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    FRONTEND_URL: str

    model_config= SettingsConfigDict(env_file=" .env")
