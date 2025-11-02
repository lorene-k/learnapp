from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import CourseResponse
from ..dependencies.db import get_db
from ..db.crud import get_all_courses
from fastapi import HTTPException

router = APIRouter(
    tags=["courses"],
    responses={404: {"description": "Not found"}}
)


@router.get("/history", response_model=list[CourseResponse])
async def get_courses(db: Session = Depends(get_db)):
    all_courses = await get_all_courses(db)
    if not all_courses:
        raise HTTPException(status_code=404, detail="User not found")
    # print([CourseResponse.from_orm(c) for c in all_courses])
    return all_courses

# Add param to get user_id :
# user: User = Depends(get_current_user)
# then user=uder_id in get_all_courses params