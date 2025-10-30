"use client";
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

interface TextInputProps {
    name: string;
    value: string;
    error?: boolean;
    helperText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export function TextInput({ name, value, error, helperText, onChange }: TextInputProps) {
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <FormControl error={error}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Input name={name} id={name} value={value} onChange={onChange} />
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
} 