import express from 'express';
import studentRoutes from '../modules/student/student.routes.js';
import mentorRoutes from '../modules/mentor/mentor.routes.js';
import parentRoutes from '../modules/parent/parent.routes.js';

const router = express.Router();

/* #swagger.tags = ['Student'] */
router.use('/students', studentRoutes);

/* #swagger.tags = ['Mentor'] */
router.use('/mentors', mentorRoutes);

/* #swagger.tags = ['Parent'] */
router.use('/parents', parentRoutes);

export default router;