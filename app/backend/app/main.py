from fastapi import FastAPI
from .endpoints.course import router as course_router
from .endpoints.history import router as history_router
from app.db.database import db_session_manager
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    db_session_manager.init_engine()
    yield
    await db_session_manager.close()


app = FastAPI(lifespan=lifespan)


app.include_router(course_router, prefix="/api")
app.include_router(history_router, prefix="/api")


@app.get("/")
def root():
    return {"FastAPI backend running at http://localhost:8000"}
