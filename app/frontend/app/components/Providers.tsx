'use client';

import { ThemeRegistry } from "../theme/ThemeRegistry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeRegistry>{children}</ThemeRegistry>
        </QueryClientProvider>
    );
}
