import express from 'express';
import * as lessonController from './lesson.controller.js';
import * as sessionController from '../session/session.controller.js';
import { lessonValidation } from './lesson.validation.js';
import validate from '../../middleware/validate.middleware.js';
import authMiddleware from '../../middleware/auth.middlewere.js';
import mentorMiddleware from '../../middleware/mentor.middlewere.js';

const router = express.Router();

router.get('/',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    lessonController.getAllLessons);

router.post('/',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonValidation,
    validate,
    lessonController.createLesson
);

router.get('/getlessonbymentor',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonController.getlessonbymentor
);

router.get('/getlesson',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonController.getlessonbymentor
);

router.get('/getlessonassigntostudent',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    lessonController.getlessonassigntostudent
);
router.get('/:id',
    // #swagger.tags = ['Lesson']
    lessonController.getLessonById);

router.get('/:id/sessions',
    // #swagger.tags = ['Lesson']
    sessionController.getSessionsByLesson);

router.put('/:id',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonValidation,
    validate,
    lessonController.updateLesson
);

router.delete('/:id',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonController.deleteLesson
);


export default router;
