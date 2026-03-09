import prisma from "../../config/db.js";
import { sessionZodSchema } from "./session.validation.js";

const createSession = async (data) => {
    const validated = sessionZodSchema.parse(data);

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
        where: { id: validated.lessonId }
    });

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    const session = await prisma.session.create({
        data: {
            lessonId: validated.lessonId,
            date: validated.date,
            topic: validated.topic,
            summary: validated.summary,
        }
    });

    return session;
};

const getSessionsByLesson = async (lessonId) => {
    const sessions = await prisma.session.findMany({
        where: { lessonId },
        orderBy: { date: 'asc' }
    });
    return sessions;
};

const getAllSessions = async () => {
    return await prisma.session.findMany({
        include: {
            lesson: true
        }
    });
};

const getSessionById = async (id) => {
    return await prisma.session.findUnique({
        where: { id },
        include: {
            lesson: true
        }
    });
};

const updateSession = async (id, data) => {
    return await prisma.session.update({
        where: { id },
        data
    });
};

const deleteSession = async (id) => {
    return await prisma.session.delete({
        where: { id }
    });
};

export {
    createSession,
    getSessionsByLesson,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
};
