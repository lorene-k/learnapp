"use client";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectInputProps {
    name: string;
    value: string;
    labels: string[];
    onChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export function SelectInput({ name, value, labels, onChange }: SelectInputProps) {
    const sectionLabel = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <FormControl fullWidth>
            <InputLabel id={name}>{sectionLabel}</InputLabel>
            <Select
                labelId={sectionLabel}
                id={name}
                name={name}
                label={sectionLabel}
                onChange={onChange}
                value={value}>
                {labels.map((label) => (
                    <MenuItem key={label} value={label}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}