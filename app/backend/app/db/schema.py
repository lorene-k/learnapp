from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CourseBase(BaseModel):
    title: str
    level: str
    duration: int
    description: str
    # lessons: Optional[list] = []
    is_favorite: bool = False


class CreateCourse(CourseBase):
    class Config:
        from_attributes = True


class CourseResponse(CourseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class UpdateCourse(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_favorite: Optional[bool] = None

    class Config:
        from_attributes = True
