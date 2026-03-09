import { body } from 'express-validator';
import { z } from 'zod';

// express-validator
export const studentValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
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
    gender: z.preprocess((val) => typeof val === 'string' ? val.toUpperCase() : val, z.enum(['MALE', 'FEMALE', 'OTHER']).optional()),
    parentId: z.string().min(1, 'Parent ID is required'),
    mentorId: z.preprocess((val) => (val === '' || val === 'null' || val === null) ? undefined : val, z.string().optional()),
    studentimage: z.preprocess((val) => val === '' ? undefined : val, z.string().optional()),
    notes: z.preprocess((val) => val === '' ? undefined : val, z.string().optional()),
    email: z.string().email().min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
