"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, Box, SelectChangeEvent, Typography } from '@mui/material';
import type { CourseRequest } from "../types/types";
import { TextInput } from './TextInput';
import { RadioInput } from './RadioInput';
import { SelectInput } from './SelectInput';
import { useGenerateCourse } from '../hooks/useGenerateCourse';

export function LearnForm() {
    const router = useRouter();
    const [formError, setFormError] = useState(false);
    const [generateError, setGenerateError] = useState(false);
    const [formTopic, setTopic] = useState<string>('');
    const [formDuration, setDuration] = useState<string>('5');
    const levelLabels = ["Beginner", "Intermediate", "Advanced"];
    const generateCourseMutation = useGenerateCourse();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formEntries = new FormData(e.currentTarget);
        const formData = Object.fromEntries(formEntries);
        const courseRequest: CourseRequest = {
            topic: formData.topic as string,
            level: formData.level as "beginner" | "intermediate" | "advanced",
            duration: parseInt(formData.duration as string),
        };
        if (!formData.topic) {
            setFormError(true);
            return;
        }
        setFormError(false);
        generateCourseMutation.mutate(courseRequest, {
            onSuccess: (data) => {
                setGenerateError(false);
                router.push(`/course/${data.id}`);
            },
            onError: (err) => {
                setGenerateError(true);
                console.error("Error generating course: ", err);

            },
        });
    }

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value)
    };

    const handleDurationChange = (e: SelectChangeEvent<string>, child: React.ReactNode) => {
        setDuration(e.target.value)
    };

    return (
        <Box>
            <Box component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', mt: 10, }}
            >
                <TextInput
                    name="topic"
                    error={formError}
                    value={formTopic}
                    onChange={handleTopicChange}
                    helperText="Please enter a topic."
                />
                <RadioInput name="level" defaultValue="beginner" labels={levelLabels} />
                <SelectInput name="duration" value={formDuration} labels={["5", "10", "20", "30"]} onChange={handleDurationChange} />
                <Button type="submit" variant="contained">Learn now</Button>
            </Box>
            {generateError && (
                <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                    An error occurred while generating the course. Please try again.
                </Typography>
            )}
        </Box>
    )
}