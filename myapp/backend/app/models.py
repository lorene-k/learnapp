from pydantic import BaseModel
from typing import List, Optional


class CourseRequest(BaseModel):
    topic: str
    level: str
    duration: int  # duration in minutes
    # chapters: int #DEFINE ACCORDING TO DURATION


class Lesson(BaseModel):
    title: str
    content: str
    links: Optional[str]


class CourseResponse(BaseModel):  # Tweak later
    title: str
    description: str
    chapters: List[Lesson]
