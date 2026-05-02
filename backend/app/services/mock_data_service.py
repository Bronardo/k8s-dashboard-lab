"""Offline mock data service for dashboard endpoints."""


def get_mock_pods() -> list[dict[str, str | int]]:
    """Return deterministic pod health data for offline/demo mode."""
    return [
        {
            "name": "auth-api",
            "status": "Running",
            "restart_count": 0,
            "age": "2d3h",
        },
        {
            "name": "redis-master",
            "status": "Running",
            "restart_count": 1,
            "age": "5d4h",
        },
        {
            "name": "frontend-v2",
            "status": "CrashLoopBackOff",
            "restart_count": 7,
            "age": "14h",
        },
    ]
