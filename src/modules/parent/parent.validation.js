import { body } from 'express-validator';
import { z } from 'zod';

export const parentValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('age').optional(),
    body('gender').optional(),
    body('address').optional(),
    body('parentimage').optional(),
];

export const parentZodSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    age: z.preprocess((val) => Number(val), z.number()).optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    parentimage: z.string().optional(),
});
