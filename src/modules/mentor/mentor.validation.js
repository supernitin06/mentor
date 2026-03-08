import { body } from "express-validator";
import z from "zod";

export const mentorValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("lesson").optional(),
    body("specialization").optional(),
    body("mentorimage").optional(),
];

export const mentorZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    lesson: z.string().optional(),
    specialization: z.string().optional(),
    mentorimage: z.string().optional(),
});
