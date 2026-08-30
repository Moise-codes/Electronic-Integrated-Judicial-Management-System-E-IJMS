from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.case import CasePriority, CaseStatus


class CaseCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: str | None = None
    case_type: str = Field(..., min_length=2, max_length=100)
    priority: CasePriority = CasePriority.MEDIUM
    defendant_name: str = Field(..., min_length=2, max_length=255)


class CaseUpdate(BaseModel):
    title: str | None = Field(None, min_length=3, max_length=255)
    description: str | None = None
    case_type: str | None = Field(None, min_length=2, max_length=100)
    status: CaseStatus | None = None
    priority: CasePriority | None = None
    defendant_name: str | None = Field(
        None,
        min_length=2,
        max_length=255,
    )


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