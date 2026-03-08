import express from 'express';
import * as studentController from './student.controller.js';
import { studentValidation } from './student.validation.js';
import validate from '../../middleware/validate.middleware.js';
import authMiddleware from '../../middleware/auth.middlewere.js';
import parentMiddleware from '../../middleware/parent.middlewere.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

/* #swagger.tags = ['Student'] */

router.get('/', studentController.getAllStudents);

router.post('/',
    // #swagger.tags = ['Student']
    authMiddleware,
    parentMiddleware(),
    upload.single('studentimage'),
    studentValidation,
    validate,
    studentController.registerStudent
);

export default router;
