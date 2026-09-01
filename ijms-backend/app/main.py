from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.router import router as auth_router
from app.cases.router import router as cases_router

app = FastAPI(
    title="IJMS API",
    description="Integrated Judicial Management System API",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    cases_router,
    prefix="/api/v1",
)

@app.get("/")
def root():
    return {
        "message": "IJMS API is running",
        "version": "1.0.0",
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }