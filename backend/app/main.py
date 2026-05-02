"""FastAPI application entrypoint for the K8s Health Dashboard backend."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.dashboard import router as dashboard_router


def create_app() -> FastAPI:
    """Create and configure the FastAPI application instance."""
    app = FastAPI(
        title="K8s Health Dashboard API",
        version="0.1.0",
        description="Backend API for Kubernetes health and workload visibility.",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(dashboard_router)

    @app.get("/")
    def root() -> dict[str, str]:
        return {"message": "K8s Health Dashboard API is running"}

    return app


app = create_app()
