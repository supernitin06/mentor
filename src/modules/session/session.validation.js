import { z } from 'zod';

export const sessionZodSchema = z.object({
    lessonId: z.string().uuid('Invalid Lesson ID'),
    date: z.preprocess((val) => val ? new Date(val) : undefined, z.date()),
    topic: z.string().min(1, 'Topic is required'),
    summary: z.string().optional(),
});
