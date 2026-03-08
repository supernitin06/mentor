import express from 'express';
import * as lessonController from './lesson.controller.js';
import { lessonValidation } from './lesson.validation.js';
import validate from '../../middleware/validate.middleware.js';
import authMiddleware from '../../middleware/auth.middlewere.js';
import mentorMiddleware from '../../middleware/mentor.middlewere.js';

const router = express.Router();

router.get('/',
    // #swagger.tags = ['Lesson']
    lessonController.getAllLessons);

router.post('/',
    // #swagger.tags = ['Lesson']
    authMiddleware,
    mentorMiddleware(),
    lessonValidation,
    validate,
    lessonController.createLesson
);

router.get('/:id',
    // #swagger.tags = ['Lesson']
    lessonController.getLessonById);

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
