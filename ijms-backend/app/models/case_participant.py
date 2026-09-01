from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SQLEnum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class ParticipantRole(str, Enum):
    PLAINTIFF = "plaintiff"
    DEFENDANT = "defendant"
    LAWYER = "lawyer"
    JUDGE = "judge"
    CLERK = "clerk"
    WITNESS = "witness"
    OTHER = "other"


class CaseParticipant(Base):
    __tablename__ = "case_participants"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    case_id: Mapped[int] = mapped_column(
        ForeignKey("cases.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    role: Mapped[ParticipantRole] = mapped_column(
        SQLEnum(ParticipantRole),
        nullable=False,
        index=True,
    )

    phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    case = relationship(
        "Case",
        back_populates="participants",
    )

    user = relationship(
        "User",
        foreign_keys=[user_id],
    )