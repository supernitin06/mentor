import { body } from 'express-validator';
import { z } from 'zod';

// express-validator
export const studentValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('parentId').notEmpty().withMessage('Parent ID is required'),
];

// Zod Schema example
export const studentZodSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    parentId: z.string().min(1, 'Parent ID is required'),
});
