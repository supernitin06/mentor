import express from 'express';
import * as studentController from './student.controller.js';
import { studentValidation } from './student.validation.js';
import validate from '../../middleware/validate.middleware.js';
import authMiddleware from '../../middleware/auth.middlewere.js';
import parentMiddleware from '../../middleware/parent.middlewere.js';
import mentorMiddleware from '../../middleware/mentor.middlewere.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

/* #swagger.tags = ['Student'] */

router.get('/',
    // #swagger.tags = ['Student']
    authMiddleware,
    studentController.getAllStudents);

router.post('/register',
    // #swagger.tags = ['Student']
    authMiddleware,
    parentMiddleware(),
    upload.single('studentimage'),
    studentValidation,
    validate,
    studentController.registerStudent
);

router.post('/login',
    // #swagger.tags = ['Student']

    studentController.studentLogin);

router.get('/getstudentbyparent',
    // #swagger.tags = ['Student']
    authMiddleware,
    parentMiddleware(),
    studentController.getstudentbyparent
);

// router.get('/getstudentbymentor',
//     // #swagger.tags = ['Student']
//     authMiddleware,
//     mentorMiddleware(),
//     studentController.getstudentbymentor
// );

export default router;
