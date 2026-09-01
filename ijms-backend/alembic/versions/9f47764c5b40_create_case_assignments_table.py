"""create case assignments table

Revision ID: 9f47764c5b40
Revises: c18dd0d5f50b
Create Date: 2026-09-01 09:41:23.946250

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "9f47764c5b40"
down_revision: Union[str, Sequence[str], None] = "c18dd0d5f50b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "case_assignments",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
            nullable=False,
        ),

        sa.Column(
            "case_id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "assigned_by_id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "role",
            sa.String(length=50),
            nullable=False,
        ),

        sa.Column(
            "assigned_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),

        sa.ForeignKeyConstraint(
            ["case_id"],
            ["cases.id"],
            ondelete="CASCADE",
        ),

        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),

        sa.ForeignKeyConstraint(
            ["assigned_by_id"],
            ["users.id"],
            ondelete="RESTRICT",
        ),
    )

    op.create_index(
        "ix_case_assignments_id",
        "case_assignments",
        ["id"],
        unique=False,
    )

    op.create_index(
        "ix_case_assignments_case_id",
        "case_assignments",
        ["case_id"],
        unique=False,
    )

    op.create_index(
        "ix_case_assignments_user_id",
        "case_assignments",
        ["user_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_case_assignments_user_id",
        table_name="case_assignments",
    )

    op.drop_index(
        "ix_case_assignments_case_id",
        table_name="case_assignments",
    )

    op.drop_index(
        "ix_case_assignments_id",
        table_name="case_assignments",
    )

    op.drop_table("case_assignments")
