from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
from app.models.user import User
from app.models.case import Case
from app.models.hearing import Hearing
from app.models.document import Document
from app.models.notification import Notification
from app.models.audit_log import AuditLog