# Brody

**Your Proactive Productivity Assistant.**

Brody helps you regain control of your day by unifying your schedule, anticipating your needs, and handling the prep work for you.

## New Architecture (MVP Rebuild)

As of January 2026, the project has been rebuilt for scale and performance:

- **`backend/`**: FastAPI implementation with LangGraph orchestration.
- **`frontend/`**: React + Vite + Tailwind CSS dashboard.
- **`_archive/`**: Legacy prototype code.

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation available at: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access the dashboard at: [http://localhost:5173](http://localhost:5173)

### 3. Usage
- Go to the Frontend Dashboard.
- Click **"Prepare My Day"**.
- View your AI-generated meeting briefs.

## Configuration
- **Backend**: Rename `backend/.env.example` (if exists) or create `.env` with `GOOGLE_API_KEY=your_key_here` for real AI generation.
- **Frontend**: API URL is currently hardcoded to `localhost:8000` for MVP.

---
For more details, see [walkthrough.md](file:///C:/Users/prajy/.gemini/antigravity/brain/869b0ae7-869a-4f1a-accd-9130172542a4/walkthrough.md) in the artifacts folder.
