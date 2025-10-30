import { useMutation } from "@tanstack/react-query";
import type { CourseRequest, CourseResponse } from "../types/types";


const URL = "https://localhost:8000";
const ENDPOINT = "/api/course";

export function useGenerateCourse() {
    return useMutation<CourseResponse, Error, CourseRequest>({
        mutationFn: async (data: CourseRequest) => {
            const resp = await fetch(`${URL}${ENDPOINT}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                // credentials: "include"
            });
            if (!resp.ok) throw new Error("Failed to generate course.");
            return await resp.json();
        }
    });
}