import * as lessonService from './lesson.service.js';

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

        const result = await lessonService.createLesson({
            name,
            description,
            mentorId
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
        const result = await lessonService.getAllLessons();
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
        const result = await lessonService.getLessonById(id);
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
        const result = await lessonService.updateLesson(id, { name, description });
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
        const result = await lessonService.deleteLesson(id);
        res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getlessonbymentor = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const mentorId = req.user.id;
        const result = await lessonService.getLessonsByMentor(mentorId);
        res.status(200).json({
            success: true,
            message: "Lessons fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getlessonbystudent = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        const studentId = req.user.id;
        const result = await lessonService.getLessonsByStudent(studentId);
        res.status(200).json({
            success: true,
            message: "Student lessons fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getlessonassigntostudent = async (req, res, next) => {
    // #swagger.tags = ['Lesson']
    try {
        if (req.user.role !== 'STUDENT') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Students only.',
            });
        }
        const result = await lessonService.getLessonAssignToStudent(req.user.id);
        res.status(200).json({
            success: true,
            message: "Assign lesson fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    getlessonbymentor,
    getlessonbystudent
    , getlessonassigntostudent
};

