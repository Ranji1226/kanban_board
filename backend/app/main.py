from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Kanban Studio")


@app.get("/", response_class=HTMLResponse)
def home() -> str:
    return """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kanban Studio</title>
  </head>
  <body>
    <main>
      <h1>Kanban Studio backend is running</h1>
      <p>The local FastAPI server is ready.</p>
      <p>Check <a href="/api/health">the health endpoint</a>.</p>
    </main>
  </body>
</html>"""


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
