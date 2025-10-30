"use client";
import { createContext, useState } from "react";
import type { CourseResponse } from "../types/types";

interface CourseContextType {
    course: CourseResponse | null;
    setCourse: (course: CourseResponse) => void;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
    const [course, setCourse] = useState<CourseResponse | null>(null);
    return (
        <CourseContext.Provider value={{ course, setCourse }}>
            {children}
        </CourseContext.Provider>
    );
}