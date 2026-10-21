from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_home_serves_local_example_page() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/html")
    assert "Kanban Studio backend is running" in response.text
    assert 'href="/api/health"' in response.text


def test_health_reports_success() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
