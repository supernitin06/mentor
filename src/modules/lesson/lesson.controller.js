import prisma from "../../config/db.js";

const createLesson = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/Lesson" }
            }
        }
    } */
    try {
        const { name, description } = req.body;
        const mentorId = req.user.id; // From authMiddleware

        const result = await prisma.lesson.create({
            data: {
                name,
                description,
                mentorId
            },
        });

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllLessons = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const result = await prisma.lesson.findMany({
            include: {
                mentor: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            message: "Lessons fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getLessonById = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const { id } = req.params;
        const result = await prisma.lesson.findUnique({
            where: { id },
            include: {
                mentor: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Lesson fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateLesson = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = await prisma.lesson.update({
            where: { id },
            data: { name, description },
        });
        res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteLesson = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const { id } = req.params;
        const result = await prisma.lesson.delete({
            where: { id },
        });
        res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson };

