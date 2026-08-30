from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.user import UserRole


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    firstname: str = Field(min_length=2, max_length=100)
    lastname: str = Field(min_length=2, max_length=100)
    role: UserRole = UserRole.CITIZEN


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    firstname: str
    lastname: str
    role: UserRole
    is_active: bool
    is_verified: bool