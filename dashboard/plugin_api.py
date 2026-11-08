"""FastAPI web router for transducer physical instrumentation."""

from __future__ import annotations

from fastapi import APIRouter

from ..engine import LAST_TRANSDUCER_CACHE, handle_transducer_sonar_ping

router = APIRouter()


@router.get("/status")
def get_transducer_status() -> dict:
    latest = LAST_TRANSDUCER_CACHE.get("latest")
    if not latest:
        latest = handle_transducer_sonar_ping({})
    return {
        "plugin": "transducer",
        "status": "active",
        "latest_sonar": latest,
    }
