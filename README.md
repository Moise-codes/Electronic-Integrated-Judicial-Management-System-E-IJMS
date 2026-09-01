# ⚖️ JusticeDesk — Electronic Integrated Judicial Management System (E-IJMS)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**JusticeDesk (E-IJMS)** is a state-of-the-art, secure digital judicial management platform engineered to automate, streamline, and modernize court processes. From electronic e-filing of cases to judicial assignment, hearing scheduling, document vault management, and judgment rendering, JusticeDesk brings transparency, efficiency, and accessibility to judicial workflows.

---

## 🌟 Key Features

### 🏛️ Case Management & E-Filing
- **Digital Case Filing**: Litigants and legal counsel can file civil, criminal, and administrative cases digitally.
- **Intelligent Case Assignment**: Automated and manual assignment of cases to judges, judicial clerks, and courtrooms based on jurisdiction and workload.
- **Case Lifecycle Tracking**: Real-time status updates (Draft, Filed, Under Review, Hearing Scheduled, Judged, Closed, Appealed).

### 🔐 Authentication & Role-Based Access Control (RBAC)
- **Role Permissions**: Granular access control for **Judges**, **Registrars**, **Clerks**, **Lawyers**, **Litigants/Citizens**, and **System Administrators**.
- **Secure Authentication**: JWT Access & Refresh token architecture with Argon2 password hashing.
- **Email Notifications & Verification**: Integrated SMTP service for email verification, password reset tokens, and judicial notice alerts.

### 📅 Hearing & Calendar Scheduling
- **Courtroom Calendar**: Conflict-free scheduling of court hearings and proceedings.
- **Session Minutes & Attendance**: Track judge panel members, legal counsel, witnesses, and court stenographers.

### ⚖️ Judgments & Rulings
- **Digital Verdict Vault**: Secure publication and tracking of court judgments, orders, and legal rulings.
- **Precedent & Search Index**: Fast filtering by legal category, case number, judge, and ruling outcome.

### 📁 Legal Document Vault
- **Document Management**: Secure upload and archiving of legal motions, evidence exhibits, and court transcripts.
- **Version Control & Integrity**: Track document history and prevent unauthorized alterations.

### 🛡️ Administration & Audit Logging
- **Comprehensive Audit Logs**: Every critical action (case creation, status transition, document upload, assignment change) is immutably logged for compliance.
- **User & System Governance**: System admins can oversee user roles, account statuses, and system metrics.

---

## 🏗️ Architecture & Tech Stack

```
                              ┌────────────────────────┐
                              │    JusticeDesk UI      │
                              │ Next.js 14 / React 18  │
                              │ TypeScript & Tailwind  │
                              └───────────┬────────────┘
                                          │  REST APIs / JSON
                                          ▼
                              ┌────────────────────────┐
                              │  JusticeDesk Backend   │
                              │ FastAPI (Python 3.10+) │
                              │ Pydantic v2 & SQLAlchemy│
                              └───────────┬────────────┘
                                          │  Async ORM
                                          ▼
                              ┌────────────────────────┐
                              │  PostgreSQL Database   │
                              │ Alembic Schema Control │
                              └────────────────────────┘
```

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS with dark/light glassmorphic UI aesthetics
- **Icons**: Lucide React Icons
- **HTTP Client**: Axios with automatic token refresh interceptors

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **ORM & Database**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Async engine) & [PostgreSQL](https://www.postgresql.org/) (via `psycopg3`)
- **Database Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Security & Tokens**: PyJWT, Passlib with Argon2/Bcrypt
- **Validation**: Pydantic v2
- **Email Service**: SMTP for verification emails and password reset flows

---

## 🔑 Environment Variables Configuration

The repository includes template configuration files (`.env.example`) for both the backend and frontend services.

### 1. Backend Environment (`ijms-backend/.env.example`)

Copy `ijms-backend/.env.example` to `ijms-backend/.env`:

```env
# Application General Settings
APP_NAME=Integrated Judicial Management System
ENVIRONMENT=development
PORT=8000

# PostgreSQL Database Connection
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/IJMS

# JWT Security & Authentication
JWT_SECRET_KEY=replace_with_a_secure_random_secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Frontend CORS URL
FRONTEND_URL=http://localhost:3000

# SMTP Email Configuration (Email Verification & Password Reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@justicedesk.gov.rw
```

#### Field Explanations:
| Variable | Description |
| :--- | :--- |
| `APP_NAME` | The official name of the application displayed in system logs and email headers. |
| `ENVIRONMENT` | Running environment (`development`, `production`, or `testing`). |
| `PORT` | Backend FastAPI server port (default: `8000`). |
| `DATABASE_URL` | PostgreSQL connection string using `psycopg3` driver (`postgresql+psycopg://...`). |
| `JWT_SECRET_KEY` | Secret key used to cryptographically sign access and refresh tokens. |
| `JWT_ALGORITHM` | Cryptographic algorithm for signing JWT tokens (default: `HS256`). |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Lifetime of user access tokens in minutes (default: `30`). |
| `FRONTEND_URL` | Origin URL of the Next.js frontend for CORS validation. |
| `SMTP_HOST` | Host address for outgoing email server (e.g., `smtp.gmail.com` or custom SMTP server). |
| `SMTP_PORT` | Port for SMTP server (usually `587` for TLS or `465` for SSL). |
| `SMTP_USERNAME` | Authenticated email address used to dispatch notification emails. |
| `SMTP_PASSWORD` | Password or App Password for the SMTP server account. |
| `SMTP_FROM` | Sender display address shown on system emails (e.g. `noreply@justicedesk.gov.rw`). |

---

### 2. Frontend Environment (`.env.example`)

Copy `.env.example` in the root folder to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

#### Field Explanation:
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL pointing to the FastAPI backend API endpoints. |

---

## 📁 Project Structure

```
.
├── ijms-backend/                 # FastAPI Backend Application
│   ├── alembic/                  # Database migration scripts
│   ├── app/                      # Main application package
│   │   ├── auth/                 # Auth routers, services, schemas & SMTP helpers
│   │   ├── cases/                # Case management & assignments router
│   │   ├── database/             # Async database session & base model
│   │   ├── models/               # SQLAlchemy ORM models (Case, Assignment, User, etc.)
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   ├── services/             # Core business logic services
│   │   └── main.py               # FastAPI entry point & middleware
│   ├── .env.example              # Backend environment template (DB, JWT, SMTP)
│   ├── alembic.ini               # Alembic migration config
│   └── requirements.txt          # Python dependency specifications
│
├── src/                          # Next.js Frontend Application
│   ├── app/                      # App router pages & API handlers
│   │   ├── (auth)/               # Auth routes (login, register, reset-password, verify)
│   │   ├── admin/                # System administration & audit log pages
│   │   ├── cases/                # Case listing, detail, and filing pages
│   │   ├── hearings/             # Court hearing calendar and details
│   │   ├── judgments/            # Legal verdicts & judgment archive
│   │   ├── documents/            # Legal document vault
│   │   └── dashboard/            # Role-tailored analytics dashboard
│   ├── components/               # UI components & App shell navigation
│   ├── services/                 # API service handlers
│   └── types/                    # TypeScript interfaces & types
│
├── .env.example                  # Frontend environment template
├── public/                       # Static public assets & brand media
├── package.json                  # Frontend dependencies & scripts
├── tailwind.config.ts            # Tailwind styling tokens & configuration
└── README.md                     # Application documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or later
- **npm**: `v9.x` or later
- **Python**: `v3.10` or later
- **PostgreSQL**: `v14` or later

---

### 1. Backend Setup (FastAPI)

1. **Navigate to the backend directory**:
   ```bash
   cd ijms-backend
   ```

2. **Create and activate a Python virtual environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your database & SMTP credentials:
   ```bash
   cp .env.example .env
   ```

5. **Run Database Migrations**:
   ```bash
   alembic upgrade head
   ```

6. **Start the FastAPI Development Server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be live at `http://localhost:8000`. Interactive API docs (Swagger UI) are available at `http://localhost:8000/docs`.

---

### 2. Frontend Setup (Next.js)

1. **Navigate to the root directory** (if in `ijms-backend`):
   ```bash
   cd ..
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to interact with **JusticeDesk**.

---

## 📖 How It Works

1. **User Onboarding & Authentication**:
   - Users register with their assigned role (Citizen/Litigant, Lawyer, Judicial Officer).
   - The backend sends a verification link via SMTP using the configured mail host.
   - Credentials are authenticated and JWT tokens are returned upon successful login.
   
2. **Filing & Processing Cases**:
   - Litigants or attorneys submit new case details and supporting documents via `/cases/new`.
   - Registrars review submissions and assign cases to designated judicial officers.

3. **Judicial Workflow**:
   - Judges and clerks view their assigned case docket in `/dashboard` and `/cases`.
   - Hearings are scheduled in `/hearings` with automatic calendar updates.
   - Upon session conclusion, judges record official rulings and publish judgments under `/judgments`.

4. **Auditability & Integrity**:
   - Administrators monitor activity via `/admin/audit-logs` to ensure compliance with judicial governance policies.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

## 🤝 Contributing & Support

For system inquiries, feature requests, or security bug reporting, please contact the Electronic Integrated Judicial Management System (E-IJMS) engineering team or submit an issue in the project repository.
