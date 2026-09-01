
from fastapi import FastAPI
from app.cases.router import router as cases_router
from app.auth.router import router as auth_router

app = FastAPI(
    title="IJMS API",
    description="Integrated Judicial Management System API",
    version="1.0.0"
)

app.include_router(
    auth_router,
    cases_router,
    prefix = ("/api/v1")

)