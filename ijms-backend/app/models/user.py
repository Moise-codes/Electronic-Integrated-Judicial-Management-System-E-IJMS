from datetime import datetime
from enum import Enum
from sqlalchemy import Enum as SQLEnum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base

class UserRole(str,Enum):
    JUDGE = "judge"
    LAWYER =  "lawyer"
    CLERK =  "clerk"
    CITIZEN  = "citizen"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key =True,
        index=True

    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        SQLEnum(UserRole),
        default= UserRole.CITIZEN,
        nullable=False
    )

    firstname: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    lastname: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        default=True,
        nullable=False
    )

    is_verified: Mapped[bool] = mapped_column(
        default=False,
        nullable=False

    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        nullable=False


    )

    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
        

    )