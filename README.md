# Kanban Studio

## Prerequisites

- Python 3.11 or later and [uv](https://docs.astral.sh/uv/getting-started/installation/) for the backend.
- Node.js 20.9 or later and npm for the frontend.
- Ollama and a locally installed model for the AI features. Ollama is not needed to run the current scaffolding.

## Run the backend

From the repository root, start FastAPI with:

```powershell
uv run --project backend uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000/` for the example page or `http://127.0.0.1:8000/api/health` for its health response. Stop the server with Ctrl+C in the terminal where it is running.

Run backend tests with `uv run --project backend --group dev pytest backend/tests`.
