from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..models import CourseRequest, CourseResponse, Lesson
from ..dependencies.db import get_db
from ..db.crud import create_course
from ..dependencies.mistral import MistralClient, get_mistral_client

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})


@router.post("/course", response_model=CourseResponse)
async def generate_course(
    request: CourseRequest,
    db: AsyncSession = Depends(get_db),
    mistral: MistralClient = Depends(get_mistral_client)):
    prompt = (
        f"Generate a {request.level} level course on the topic of {request.topic} "
        f"that lasts approximately {request.duration}. Include a course title, "
        "a brief description, and a list of lessons with titles and content and eventually source links if useful."
    )
    generated_course = mistral.generate_course(prompt)
    print("GENERATED COURSE = ", generated_course) # ! TEST
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
