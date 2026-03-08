import { body } from 'express-validator';
import { z } from 'zod';

export const lessonValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
];

export const lessonZodSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
});
