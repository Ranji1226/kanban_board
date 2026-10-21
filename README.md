# Kanban Studio

## Prerequisites

- Python 3.11 or later and [uv](https://docs.astral.sh/uv/getting-started/installation/) for the backend. If PowerShell says `uv` is not recognized but uv is installed as a Python package, invoke it as `python -m uv`.
- Node.js 20.9 or later and npm for the frontend.
- Ollama and a locally installed model for the AI features. Ollama is not needed to run the current scaffolding.

## Run the backend

First, build the static frontend:

```powershell
cd frontend
npm ci
npm run build
```

Then, from the repository root, start FastAPI:

```powershell
python -m uv run --project backend uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

FastAPI serves the exported Kanban app at `http://127.0.0.1:8000/` and the health response at `http://127.0.0.1:8000/api/health`. Stop the server with Ctrl+C in the terminal where it is running.

The demo sign-in uses `user` / `password`. This is a client-side MVP gate, not a security boundary.

Run backend tests with `python -m uv run --project backend --group dev pytest backend/tests`.
