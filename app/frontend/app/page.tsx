"use client";
import { LearnForm } from "./components/LearnForm";
import { DropdownMenu } from "./components/DropdownMenu";
import { Box } from '@mui/material';

export default function Home() {
    return (
        <Box>
            <DropdownMenu />
            <LearnForm />
        </Box>
    );
}

// Light/dark mode toggle
{/* <Switch {...label} /> */ }