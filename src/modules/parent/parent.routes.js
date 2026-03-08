import express from 'express';
import * as parentController from './parent.controller.js';
import { parentValidation } from './parent.validation.js';
import validate from '../../middleware/validate.middleware.js';
import upload from '../../middleware/multer.middleware.js';

const router = express.Router();

/* #swagger.tags = ['Parent'] */

router.post('/register',
    // #swagger.tags = ['Parent']
    upload.single("parentimage"),
    parentValidation, validate, parentController.registerParent);


router.get('/',
    // #swagger.tags = ['Parent']
    parentController.getAllParents);    


router.post('/login',
    // #swagger.tags = ['Parent']
    parentController.parentLogin);

export default router;
