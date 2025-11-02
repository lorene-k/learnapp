"use client";
import { Box } from '@mui/material';
import { DropdownMenu } from '../components/DropdownMenu';
import { useCourseHistory } from '../hooks/useCourseHistory';
import { Loader } from '../components/Loader';

export default function ShowHistory() {
    const { data: courses, isLoading, isError, error } = useCourseHistory();
    console.log(courses);
    if (isLoading) {
        return (
            <Loader message="Loading course history..." />
        );
    }
    if (isError) {
        return <Box>Error: {error.message}</Box>;
    }
    return (
        <Box>
            <DropdownMenu />
            History Page
            <ul>
                {courses?.map((course) => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </Box>
    );
}


// If date needed : 
// const courseDate = new Date(course.created_at);