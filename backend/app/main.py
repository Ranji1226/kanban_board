from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Kanban Studio")

frontend_build = Path(__file__).resolve().parents[2] / "frontend" / "out"
if not frontend_build.is_dir():
    raise RuntimeError(
        f"Frontend export not found at {frontend_build}. "
        "Build it first with `npm run build` from the frontend directory."
    )


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.mount("/", StaticFiles(directory=frontend_build, html=True), name="frontend")
