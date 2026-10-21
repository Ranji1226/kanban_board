# Backend

## Current application

- `app/main.py` defines the FastAPI application.
- The app serves the static Next.js export from `frontend/out` at `/`.
- `GET /api/health` returns a simple status response.
- `tests/` contains backend API tests.
- `pyproject.toml` declares backend dependencies and the `uv` development test group.

## Local development

Build the frontend export before starting the backend:

```powershell
cd frontend
npm run build
```

Then, from the repository root:

- Run the backend: `python -m uv run --project backend uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000`
- Run backend tests: `python -m uv run --project backend --group dev pytest backend/tests`

Stop the backend with Ctrl+C in the terminal where it is running. The application is intended to run directly on the local machine. Do not add Docker, launcher scripts, or hosted AI dependencies.