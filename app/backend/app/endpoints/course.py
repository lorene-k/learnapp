from fastapi import APIRouter
from ..models import CourseRequest, CourseResponse, Lesson

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Test endpoint is working!"}


@router.post("/course", response_model=CourseResponse)
async def generate_course(request: CourseRequest):
    if not request or not request.topic or not request.level or not request.duration:
        return {"ERROR"}
    mock_lesson = Lesson(
        title="Test Lesson",
        content="This is a test lesson content.",
        links="http://example.com/resource",
    )
    return CourseResponse(
        title=f"Test Course: {request.topic}",
        description=f"Test description for a {request.level} level course.",
        lessons=[mock_lesson],
    )
