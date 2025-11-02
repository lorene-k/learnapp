from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..models import CourseRequest, CourseResponse, Lesson
from ..dependencies.db import get_db
from ..db.crud import create_course

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})


@router.post("/course", response_model=CourseResponse)
async def generate_course(request: CourseRequest, db: AsyncSession = Depends(get_db)):
    # mock_lesson = Lesson(
    #     title="Test Lesson",
    #     content="This is a test lesson content.",
    #     links="http://example.com/resource",
    # )
    course = CourseResponse(
        title=f"Test Course: {request.topic}",
        level=request.level,
        duration=request.duration,
        description=f"Test description for a {request.level} level course.",
        is_favorite=False,
        # lessons=[mock_lesson],
    )
    db_course = await create_course(db, course)
    return db_course


# API call to create CourseResponse
