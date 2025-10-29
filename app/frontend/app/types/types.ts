export interface CourseRequest {
    topic: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: number; // in minutes
}

export interface Lesson {
    title: string;
    content: string;
    links?: string[];
}

export interface CourseResponse {
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface FormData {
    topic: string;
    level: string;
    duration: string;
}