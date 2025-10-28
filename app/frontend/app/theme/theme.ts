import { createTheme } from '@mui/material/styles';

const typography = {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700 },
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 },
}

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        typography,
        palette: {
            mode: mode,
            background: {
                default: mode === 'light' ? '#f5f5f5' : '#333333',
            },
        },
    });