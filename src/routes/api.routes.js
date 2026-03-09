import express from 'express';
import studentRoutes from '../modules/student/student.routes.js';
import mentorRoutes from '../modules/mentor/mentor.routes.js';
import parentRoutes from '../modules/parent/parent.routes.js';
import lessonRoutes from '../modules/lesson/lesson.route.js';
import sessionRoutes from '../modules/session/session.routes.js';

const router = express.Router();

/* #swagger.tags = ['Student'] */
router.use('/students', studentRoutes);

/* #swagger.tags = ['Mentor'] */
router.use('/mentors', mentorRoutes);

/* #swagger.tags = ['Parent'] */
router.use('/parents', parentRoutes);

/* #swagger.tags = ['Lesson'] */
router.use('/lessons', lessonRoutes);

/* #swagger.tags = ['Session'] */
router.use('/sessions', sessionRoutes);

export default router;