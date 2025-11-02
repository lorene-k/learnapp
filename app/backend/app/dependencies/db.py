from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import db_session_manager


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency to get a database session."""
    async for session in db_session_manager.get_session():
        yield session
