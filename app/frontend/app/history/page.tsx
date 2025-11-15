"use client";
import { Box, Typography } from '@mui/material';
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
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', mt: 4 }}>
                    <Typography variant="h2">Course History</Typography>
                    <ul>
                        {courses?.map((course) => (
                            <li key={course.id}>{course.title}</li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </Box>
    );
}


// If date needed : 
// const courseDate = new Date(course.created_at);