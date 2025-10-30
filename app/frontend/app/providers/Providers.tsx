"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeRegistry } from "../theme/ThemeRegistry";
import { CourseProvider } from "./CourseContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeRegistry>
                <CourseProvider>
                    {children}
                </CourseProvider>
            </ThemeRegistry>
        </QueryClientProvider>
    );
}
