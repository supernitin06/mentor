import prisma from "../../config/db.js";

const createLesson = async (data) => {
    const { name, description, mentorId } = data;

    // Check if lesson already exists
    const checkLesson = await prisma.lesson.findUnique({
        where: { name },
    });
    if (checkLesson) {
        throw new Error("Lesson already exists");
    }

    const result = await prisma.lesson.create({
        data: { name, description, mentorId },
    });
    return result;
};

const getAllLessons = async () => {
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
    return result;
};

const getLessonById = async (id) => {
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
        throw new Error("Lesson not found");
    }
    return result;
};

const updateLesson = async (id, data) => {
    const { name, description } = data;
    const result = await prisma.lesson.update({
        where: { id },
        data: { name, description },
    });
    return result;
};

const deleteLesson = async (id) => {
    const result = await prisma.lesson.delete({
        where: { id },
    });
    return result;
};

const getLessonsByMentor = async (mentorId) => {
    const result = await prisma.lesson.findMany({
        where: { mentorId },
    });
    return result;
};

const getLessonsByStudent = async (studentId) => {
    // Find all LessonAssign records for this student and include the lesson details
    const assignments = await prisma.lessonAssign.findMany({
        where: { studentId },
        include: {
            lesson: {
                include: {
                    mentor: {
                        select: { name: true, email: true }
                    }
                }
            }
        }
    });

    // Extract just the lesson objects
    const lessons = assignments.map(a => a.lesson);
    return lessons;
};

const getLessonAssignToStudent = async (studentId) => {
    const result = await prisma.lessonAssign.findMany({
        where: { studentId },
        include: {
            lesson: {
                include: {
                    mentor: {
                        select: { name: true, email: true }
                    },
                    sessions: true
                }
            }
        }
    });
    return result;
};

export {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    getLessonsByMentor,
    getLessonsByStudent,
    getLessonAssignToStudent
};