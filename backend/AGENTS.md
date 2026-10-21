# Backend

## Current application

- `app/main.py` defines the FastAPI application.
- `GET /` serves a minimal HTML page to verify the local app is running.
- `GET /api/health` returns a simple status response.
- `tests/` contains backend API tests.
- `pyproject.toml` declares backend dependencies and the `uv` development test group.

## Local development

From the repository root:

- Run the backend: `uv run --project backend uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000`
- Run backend tests: `uv run --project backend --group dev pytest backend/tests`

Stop the backend with Ctrl+C in the terminal where it is running. The application is intended to run directly on the local machine. Do not add Docker, launcher scripts, or hosted AI dependencies.