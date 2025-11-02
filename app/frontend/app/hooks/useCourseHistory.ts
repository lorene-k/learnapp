import { useQuery } from "@tanstack/react-query";
import type { CourseResponse } from "../types/types";

const URL = "https://localhost";
const ENDPOINT = "/api/history";

export function useCourseHistory() { // ADD USER ID
    return useQuery<CourseResponse[], Error>({
        queryKey: ["history"], // ADD USER ID (also in query string)
        queryFn: async () => {
            const resp = await fetch(`${URL}${ENDPOINT}`);
            console.log((typeof(resp))); // ! FIX - resp undefined
            if (!resp.ok)
                throw new Error("Failed to fetch course history");
            const res = await resp.json();
            return res.data as CourseResponse[];
        }
        // enabled: !!userId, // only run when userId exists
        // staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });
}