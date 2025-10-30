"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, Box, SelectChangeEvent } from '@mui/material';
import type { CourseRequest, CourseResponse } from "../types/types";
import { TextInput } from './TextInput';
import { RadioInput } from './RadioInput';
import { SelectInput } from './SelectInput';
import { useGenerateCourse } from '../hooks/useGenerateCourse';
import { useCourseContext } from '../hooks/useCourseContext';

export function LearnForm() {
    const router = useRouter();
    const courseContext = useCourseContext();
    const [error, setError] = useState(false);
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
            setError(true);
            return;
        }
        setError(false);
        generateCourseMutation.mutate(courseRequest, {
            onSuccess: (data: CourseResponse) => {
                courseContext.setCourse(data);
                router.push("/course");
            },
            onError: (err) => {
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
        <Box component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto', mt: 10, }}
        >
            <TextInput
                name="topic"
                error={error}
                value={formTopic}
                onChange={handleTopicChange}
                helperText="Please enter a topic."
            />
            <RadioInput name="level" defaultValue="beginner" labels={levelLabels} />
            <SelectInput name="duration" value={formDuration} labels={["5", "10", "20", "30"]} onChange={handleDurationChange} />
            <Button type="submit" variant="contained">Learn now</Button>
        </Box>
    )
}