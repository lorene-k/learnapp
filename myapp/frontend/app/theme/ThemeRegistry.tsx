'use client';

import { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from "./theme";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    useEffect(() => {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(darkMode ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => getTheme(mode), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}