from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from app.core.config import settings
from app.database.base import Base

# Import all models so Alembic can detect their tables.
from app.models.user import User
from app.models.case import Case
from app.models.hearing import Hearing
from app.models.document import Document
from app.models.notification import Notification
from app.models.audit_log import AuditLog
from app.models.judgment import Judgment
from app.models.case_participant import CaseParticipant
from app.models.case_assignment import CaseAssignment


config = context.config


if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Alembic uses this metadata to detect model/table changes.
target_metadata = Base.metadata


# Use the application's database configuration.
config.set_main_option(
    "sqlalchemy.url",
    settings.DATABASE_URL.replace("%", "%%"),
)


def run_migrations_offline() -> None:
    """Run migrations without establishing a database connection."""

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named",
        },
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations using an active database connection."""

    connectable = engine_from_config(
        config.get_section(
            config.config_ini_section,
            {},
        ),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()