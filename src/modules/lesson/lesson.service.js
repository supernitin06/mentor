import prisma from "../../config/db.js";

const createLesson = async (req, res, next) => {
    try {
         const { name, description} = req.body;
         const checkLesson = await prisma.lesson.findUnique({
            where: { name },
         });
         if(checkLesson){
            throw new Error("Lesson already exists");
         }
    
        const result = await prisma.lesson.create({
            data: { name, description, mentorId: req.user.id },
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
    try {
        const result = await prisma.lesson.findMany();
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
    try {
        const { id } = req.params;
        const result = await prisma.lesson.findUnique({
            where: { id },
        });
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