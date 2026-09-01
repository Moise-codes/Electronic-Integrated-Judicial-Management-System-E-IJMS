from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.case import CasePriority, CaseStatus


class CaseCreate(BaseModel):
    title: str
    description: str | None = None
    case_type: str
    defendant_name: str
    priority: CasePriority = CasePriority.MEDIUM


class CaseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    case_type: str | None = None
    defendant_name: str | None = None
    priority: CasePriority | None = None
    status: CaseStatus | None = None


class CaseStatusUpdate(BaseModel):
    status: CaseStatus


class CaseAssignment(BaseModel):
    judge_id: int | None = None
    lawyer_id: int | None = None


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