"""Dashboard endpoints backed by mock service data."""

from datetime import datetime, timezone

from fastapi import APIRouter

from ...models.schemas import UnifiedResponseEnvelope
from ...services.mock_data_service import get_mock_pods

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])


@router.get("/workloads", response_model=UnifiedResponseEnvelope)
def get_workloads() -> UnifiedResponseEnvelope:
    """Return mock workload data in the unified response format."""
    return UnifiedResponseEnvelope(
        source="mock",
        generated_at=datetime.now(timezone.utc).isoformat(),
        data={"pods": get_mock_pods()},
    )
