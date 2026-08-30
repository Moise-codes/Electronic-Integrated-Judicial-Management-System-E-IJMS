from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.case import Case, CasePriority, CaseStatus
from app.models.user import User, UserRole
from app.schemas.case import CaseAssignment, CaseCreate, CaseUpdate


def generate_case_number(db: Session) -> str:
    last_case = db.execute(
        select(Case)
        .order_by(Case.id.desc())
    ).scalar_one_or_none()

    next_id = 1 if last_case is None else last_case.id + 1

    return f"IJMS-{datetime_year()}-{next_id:06d}"


def datetime_year() -> int:
    from datetime import datetime

    return datetime.utcnow().year


def create_case(
    db: Session,
    case_data: CaseCreate,
    plaintiff: User,
) -> Case:
    case = Case(
        case_number=generate_case_number(db),
        title=case_data.title,
        description=case_data.description,
        case_type=case_data.case_type,
        priority=case_data.priority,
        defendant_name=case_data.defendant_name,
        plaintiff_id=plaintiff.id,
        status=CaseStatus.PENDING,
    )

    db.add(case)
    db.commit()
    db.refresh(case)

    return case


def get_case(
    db: Session,
    case_id: int,
) -> Case | None:
    return db.execute(
        select(Case).where(Case.id == case_id)
    ).scalar_one_or_none()


def get_cases(
    db: Session,
    current_user: User,
) -> list[Case]:
    query = select(Case)

    if current_user.role == UserRole.CITIZEN:
        query = query.where(
            Case.plaintiff_id == current_user.id
        )

    elif current_user.role == UserRole.JUDGE:
        query = query.where(
            Case.assigned_judge_id == current_user.id
        )

    elif current_user.role == UserRole.LAWYER:
        query = query.where(
            Case.assigned_lawyer_id == current_user.id
        )

    return list(
        db.execute(
            query.order_by(Case.created_at.desc())
        ).scalars().all()
    )


def update_case(
    db: Session,
    case: Case,
    case_data: CaseUpdate,
) -> Case:
    update_data = case_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(case, field, value)

    db.commit()
    db.refresh(case)

    return case


def assign_case(
    db: Session,
    case: Case,
    assignment: CaseAssignment,
) -> Case:
    if assignment.judge_id is not None:
        judge = db.execute(
            select(User).where(
                User.id == assignment.judge_id,
                User.role == UserRole.JUDGE,
            )
        ).scalar_one_or_none()

        if judge is None:
            raise ValueError("Selected judge does not exist")

        case.assigned_judge_id = judge.id

    if assignment.lawyer_id is not None:
        lawyer = db.execute(
            select(User).where(
                User.id == assignment.lawyer_id,
                User.role == UserRole.LAWYER,
            )
        ).scalar_one_or_none()

        if lawyer is None:
            raise ValueError("Selected lawyer does not exist")

        case.assigned_lawyer_id = lawyer.id

    case.status = CaseStatus.ACTIVE

    db.commit()
    db.refresh(case)

    return case


def delete_case(
    db: Session,
    case: Case,
) -> None:
    db.delete(case)
    db.commit()