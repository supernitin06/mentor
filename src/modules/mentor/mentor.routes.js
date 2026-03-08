import express from 'express';
import prisma from '../../config/db.js';
import { mentorValidation } from './mentor.validation.js';
import * as mentorController from './mentor.controller.js';
import validate from '../../middleware/validate.middleware.js';
import authMiddleware from '../../middleware/auth.middlewere.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

/* #swagger.tags = ['Mentor'] */    

router.post('/register',
    // #swagger.tags = ['Mentor']
    upload.single("mentorimage"),
    mentorValidation, validate, mentorController.registerMentor);

router.post('/login',
    // #swagger.tags = ['Mentor']
    mentorController.mentorLogin);

router.get('/',
    // #swagger.tags = ['Mentor']
    authMiddleware, mentorController.getAllMentors);

export default router;