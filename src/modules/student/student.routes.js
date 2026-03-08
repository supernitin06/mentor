import express from 'express';
import * as studentController from './student.controller.js';
import { studentValidation } from './student.validation.js';
import validate from '../../middleware/validate.middleware.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Student']
    // #swagger.summary = 'Get all students'
    studentController.getAllStudents(req, res, next);
});

router.post('/', studentValidation, validate, (req, res, next) => {
    // #swagger.tags = ['Student']
    // #swagger.summary = 'Create a new student'
    studentController.createStudent(req, res, next);
});

export default router;
