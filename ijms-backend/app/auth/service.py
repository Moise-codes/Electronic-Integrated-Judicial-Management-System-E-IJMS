from sqlalchemy.orm import Session

from app.auth.schemas import LoginRequest, RegisterRequest
from app.auth.security import create_access_token, hash_password, verify_password
from app.models.user import User


def register_user(
    db: Session,
    data: RegisterRequest,
) -> User:
    """Register a new user."""

    # Check whether email already exists
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise ValueError("A user with this email already exists.")

    # Create new user
    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        firstname=data.firstname,
        lastname=data.lastname,
        role=data.role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(
    db: Session,
    data: LoginRequest,
) -> str:
    """Authenticate a user and return a JWT access token."""

    # Find user by email
    user = db.query(User).filter(User.email == data.email).first()

    # User doesn't exist
    if not user:
        raise ValueError("Invalid email or password.")

    # Password doesn't match
    if not verify_password(
        data.password,
        user.password_hash,
    ):
        raise ValueError("Invalid email or password.")

    # Account is disabled
    if not user.is_active:
        raise ValueError("This account is inactive.")

    # Create JWT
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "role": user.role.value,
        }
    )

    return access_token