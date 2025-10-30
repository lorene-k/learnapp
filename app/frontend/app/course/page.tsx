"use client"
import { Typography, Box } from "@mui/material";
import { useCourseContext } from "../hooks/useCourseContext";
import type { CourseResponse } from "../types/types";

export default function ShowCourse() {
    const { course } = useCourseContext();
    if (!course)
        return <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>No course data available. Please generate a course first.</Typography>;
    const { title, description, lessons } = course as CourseResponse;
    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
            <Typography variant="h1" sx={{ mb: 3 }}>{title}</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{description}</Typography>
            <Typography variant="h2" sx={{ mb: 3 }}>Lessons</Typography>
            <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>{
                lessons.map((lesson) => (
                    <Box key={lesson.title} sx={{ mb: 2 }}>
                        <Typography variant="h3">{lesson.title}</Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>{lesson.content}</Typography>
                    </Box>
                ))}</Box>
        </Box>
    );
}