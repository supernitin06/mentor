import express from 'express';
import studentRoutes from '../modules/student/student.routes.js';
import mentorRoutes from '../modules/mentor/mentor.routes.js';
import parentRoutes from '../modules/parent/parent.routes.js';
import lessonRoutes from '../modules/lesson/lesson.route.js';

const router = express.Router();

/* #swagger.tags = ['Student'] */
router.use('/students', studentRoutes);

/* #swagger.tags = ['Mentor'] */
router.use('/mentors', mentorRoutes);

/* #swagger.tags = ['Parent'] */
router.use('/parents', parentRoutes);

/* #swagger.tags = ['Lesson'] */
router.use('/lessons', lessonRoutes);

export default router;