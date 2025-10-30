"use client"
import { Box } from "@mui/material";
import { useCourseContext } from "../hooks/useCourseContext";

export default function ShowCourse() {
    const course = useCourseContext();
    return (
        <Box>
            <div>Course Page</div>
            <pre>{JSON.stringify(course)}</pre>
        </Box>
    );
}