from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.connection import get_db
from app.models.case import Case
from app.models.user import User, UserRole
from app.schemas.case import (
    CaseAssignment,
    CaseCreate,
    CaseResponse,
    CaseUpdate,
)
from app.services.case_service import (
    assign_case,
    create_case,
    delete_case,
    get_case,
    get_cases,
    update_case,
)


router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)


@router.post(
    "/",
    response_model=CaseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_case(
    case_data: CaseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role not in {
        UserRole.CITIZEN,
        UserRole.LAWYER,
        UserRole.ADMIN,
    }:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to create cases",
        )

    return create_case(
        db=db,
        case_data=case_data,
        plaintiff=current_user,
    )


@router.get(
    "/",
    response_model=list[CaseResponse],
)
def list_cases(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_cases(
        db=db,
        current_user=current_user,
    )


@router.get(
    "/{case_id}",
    response_model=CaseResponse,
)
def get_single_case(
    case_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = get_case(db, case_id)

    if case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )

    # Admins can access every case.
    if current_user.role == UserRole.ADMIN:
        return case

    # Citizens can access their own cases.
    if (
        current_user.role == UserRole.CITIZEN
        and case.plaintiff_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to access this case",
        )

    # Judges can access assigned cases.
    if (
        current_user.role == UserRole.JUDGE
        and case.assigned_judge_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to access this case",
        )

    # Lawyers can access assigned cases.
    if (
        current_user.role == UserRole.LAWYER
        and case.assigned_lawyer_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to access this case",
        )

    return case


@router.patch(
    "/{case_id}",
    response_model=CaseResponse,
)
def update_existing_case(
    case_id: int,
    case_data: CaseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = get_case(db, case_id)

    if case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )

    allowed = (
        current_user.role == UserRole.ADMIN
        or case.plaintiff_id == current_user.id
        or case.assigned_judge_id == current_user.id
        or case.assigned_lawyer_id == current_user.id
    )

    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this case",
        )

    return update_case(
        db=db,
        case=case,
        case_data=case_data,
    )


@router.post(
    "/{case_id}/assign",
    response_model=CaseResponse,
)
def assign_existing_case(
    case_id: int,
    assignment: CaseAssignment,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can assign cases",
        )

    case = get_case(db, case_id)

    if case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )

    try:
        return assign_case(
            db=db,
            case=case,
            assignment=assignment,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.delete(
    "/{case_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_existing_case(
    case_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can delete cases",
        )

    case = get_case(db, case_id)

    if case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )

    delete_case(db, case)

    return None