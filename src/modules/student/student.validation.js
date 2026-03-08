import { body } from 'express-validator';
import { z } from 'zod';

// express-validator
export const studentValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').optional(),
    body('gender').optional(),
    body('mentorId').optional(),
    body('notes').optional(),
];

// Zod Schema
export const studentZodSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.preprocess((val) => val ? new Date(val) : undefined, z.date().optional()),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    parentId: z.string().min(1, 'Parent ID is required'),
    mentorId: z.string().optional(),
    studentimage: z.string().optional(),
    notes: z.string().optional(),
});
