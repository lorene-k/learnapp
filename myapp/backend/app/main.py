from fastapi import FastAPI
from endpoints.course import router as course_router

app = FastAPI()
app.include_router(course_router)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI"}
