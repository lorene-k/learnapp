"use client";
import { FormControl, FormLabel, FormControlLabel, FormHelperText, RadioGroup, Radio } from '@mui/material';

interface RadioInputProps {
    name: string;
    labels: string[];
    defaultValue: string;
}

export function RadioInput({ name, defaultValue, labels }: RadioInputProps) {
    const sectionLabel = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <FormControl>
            <FormLabel id={name}>{sectionLabel}</FormLabel>
            <RadioGroup defaultValue={defaultValue} name={name}>
                {labels.map((label) => (
                    <FormControlLabel
                        key={label}
                        value={label.toLowerCase()}
                        control={<Radio />}
                        label={label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}