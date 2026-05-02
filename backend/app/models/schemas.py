"""Shared response schemas for dashboard endpoints."""

from typing import Any, Literal

from pydantic import BaseModel, Field


DataSource = Literal["live", "mock"]


class UnifiedResponseEnvelope(BaseModel):
    """Standard API envelope for dashboard and health responses."""

    source: DataSource = Field(..., description="Origin of returned data")
    generated_at: str = Field(..., description="ISO-8601 generation timestamp")
    data: dict[str, Any] = Field(default_factory=dict, description="Response payload")
    reason: str | None = Field(
        default=None,
        description="Optional explanation, e.g. mock fallback reason",
    )
