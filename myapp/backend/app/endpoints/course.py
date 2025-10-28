from fastapi import APIRouter
from models import CourseRequest, CourseResponse, Lesson

router = APIRouter()


@router.post("/api/course", response_model=CourseResponse)
async def generate_course(request: CourseRequest):
    mock_lesson = Lesson(
        title="Test Lesson",
        content="This is a test lesson content.",
        links="http://example.com/resource",
    )
    return CourseResponse(
        title=f"Test Course: {request.topic}",
        description="Test description for a {request.level} level course.",
        lessons=[mock_lesson],
    )
