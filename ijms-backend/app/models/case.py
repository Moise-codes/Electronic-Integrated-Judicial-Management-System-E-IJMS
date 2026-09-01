from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SQLEnum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class CaseStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    HEARING = "hearing"
    JUDGMENT = "judgment"
    CLOSED = "closed"
    ARCHIVED = "archived"


class CasePriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class Case(Base):
    __tablename__ = "cases"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    case_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    case_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    status: Mapped[CaseStatus] = mapped_column(
        SQLEnum(CaseStatus),
        default=CaseStatus.PENDING,
        nullable=False,
        index=True,
    )

    priority: Mapped[CasePriority] = mapped_column(
        SQLEnum(CasePriority),
        default=CasePriority.MEDIUM,
        nullable=False,
    )

    plaintiff_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    defendant_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    assigned_judge_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    assigned_lawyer_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # User relationships
    plaintiff = relationship(
        "User",
        foreign_keys=[plaintiff_id],
    )

    assigned_judge = relationship(
        "User",
        foreign_keys=[assigned_judge_id],
    )

    assigned_lawyer = relationship(
        "User",
        foreign_keys=[assigned_lawyer_id],
    )

    # Hearing relationship
    hearings = relationship(
        "Hearing",
        back_populates="case",
        cascade="all, delete-orphan",
    )

    participants = relationship(
        "CaseParticipant",
        back_populates = "case",
        cascade = "all, delete-orphan",
    )
    judgment = relationship(
    "Judgment",
    back_populates="case",
    uselist=False,
    cascade="all, delete-orphan",
)