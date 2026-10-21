import re

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_home_serves_exported_kanban_app() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/html")
    assert "Kanban Studio" in response.text
    asset_match = re.search(r'(?:src|href)="(/_next/static/[^"]+)"', response.text)
    assert asset_match

    asset_response = client.get(asset_match.group(1))
    assert asset_response.status_code == 200


def test_health_reports_success() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
