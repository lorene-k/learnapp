"use client";
import { useContext } from 'react';
import { CourseContext } from '../providers/CourseContext';

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (!context)
        throw new Error('useCourseContext must be used within a CourseProvider');
    return context;
}