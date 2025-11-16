from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CourseRequest(BaseModel):
    topic: str
    level: str
    duration: int  # duration in minutes
    # chapters: int #DEFINE ACCORDING TO DURATION ?


class Lesson(BaseModel):
    title: str
    content: str
    links: Optional[str]


class CourseResponse(BaseModel):  # Tweak later
    id: int
    created_at: datetime
    title: str
    level: str
    duration: int
    description: str
    is_favorite: bool
    # lessons: List[Lesson]