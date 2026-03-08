import express from 'express';
import prisma from '../../config/db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Parent']
    // #swagger.summary = 'Get all parents'
    try {
        const parents = await prisma.parent.findMany();
        res.status(200).json({ success: true, data: parents });
    } catch (error) {
        next(error);
    }
});

export default router;
