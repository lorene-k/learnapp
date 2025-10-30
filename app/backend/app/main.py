from fastapi import FastAPI
from .endpoints.course import router as course_router

# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# origin = ["http://localhost:3000"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origin,
#     # allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(course_router, prefix="/api")


@app.get("/")
def root():
    return {"FastAPI backend running at http://localhost:8000"}
