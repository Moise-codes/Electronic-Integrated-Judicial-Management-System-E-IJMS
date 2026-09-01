from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.case import CasePriority, CaseStatus


class CaseCreate(BaseModel):
    case_number: str
    title: str
    description: str | None = None
    case_type: str
    plaintiff_id: int
    defendant_name: str
    priority: CasePriority = CasePriority.MEDIUM


class CaseStatusUpdate(BaseModel):
    status: CaseStatus


class CaseAssignment(BaseModel):
    user_id: int


class CaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    case_number: str
    title: str
    description: str | None
    case_type: str
    status: CaseStatus
    priority: CasePriority
    plaintiff_id: int
    defendant_name: str
    assigned_judge_id: int | None
    assigned_lawyer_id: int | None
    created_at: datetime
    updated_at: datetime