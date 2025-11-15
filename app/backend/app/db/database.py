from __future__ import annotations
from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import AsyncAdaptedQueuePool
from app.core.settings import app_env_settings as settings
from sqlalchemy.sql import text


class DBSessionManager:
    """Manages asynchronous DB sessions with connection pooling."""

    def __init__(self) -> None:
        self.engine: Optional[AsyncEngine] = None
        self.session_factory: Optional[async_sessionmaker[AsyncSession]] = None

    def init_engine(self) -> None:
        """Initializes the database engine and session factory."""
        DATABASE_URL = (
            f"postgresql+asyncpg://{settings.db.POSTGRES_USER}:{settings.db.POSTGRES_PASSWORD}"
            f"@{settings.db.POSTGRES_HOST}:{settings.db.POSTGRES_PORT}/{settings.db.POSTGRES_DB}"
        )
        self.engine = create_async_engine(
            DATABASE_URL,
            poolclass=AsyncAdaptedQueuePool,
            pool_size=settings.db.POOL_SIZE,
            max_overflow=settings.db.MAX_OVERFLOW,
            pool_pre_ping=True,
            pool_recycle=settings.db.POOL_RECYCLE,
            echo=settings.db.DEBUG,
        )

        self.session_factory = async_sessionmaker(
            self.engine,
            expire_on_commit=False,
            autoflush=False,
            class_=AsyncSession,
        )

    async def close(self) -> None:
        """Dispose of the database engine."""
        if self.engine:
            await self.engine.dispose()

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Yield a database session with the correct schema set."""
        if not self.session_factory:
            raise RuntimeError("Databse session factory is not initialized.")
        async with self.session_factory() as session:
            try:
                if settings.db.POSTGRES_SCHEMA:
                    await session.execute(
                        text(f"SET search_path TO {settings.db.POSTGRES_SCHEMA}")
                    )
                yield session
            except Exception as e:
                await session.rollback()
                raise RuntimeError(f"Database session error: {e!r}") from e


db_session_manager = DBSessionManager()
