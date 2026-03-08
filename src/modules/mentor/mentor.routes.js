import express from 'express';
import prisma from '../../config/db.js';
import { mentorValidation } from './mentor.validation.js';
import * as mentorController from './mentor.controller.js'; 
import validate from '../../middleware/validate.middleware.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Mentor']
    // #swagger.summary = 'Get all mentors'
    mentorController.getAllMentors(req, res, next);
});

router.post('/', mentorValidation, validate, async (req, res, next) => {
    // #swagger.tags = ['Mentor']
    // #swagger.summary = 'Create a new mentor'
    mentorController.registerMentor(req, res, next);
});

export default router;