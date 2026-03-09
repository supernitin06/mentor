import * as sessionService from "./session.service.js";

const createSession = async (req, res, next) => {
    try {
        const result = await sessionService.createSession(req.body);
        res.status(201).json({
            success: true,
            message: "Session created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getSessionsByLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await sessionService.getSessionsByLesson(id);
        res.status(200).json({
            success: true,
            message: "Sessions fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllSessions = async (req, res, next) => {
    try {
        const result = await sessionService.getAllSessions();
        res.status(200).json({
            success: true,
            message: "All sessions fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getSessionById = async (req, res, next) => {
    try {
        const result = await sessionService.getSessionById(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateSession = async (req, res, next) => {
    try {
        const result = await sessionService.updateSession(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Session updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteSession = async (req, res, next) => {
    try {
        await sessionService.deleteSession(req.params.id);
        res.status(200).json({
            success: true,
            message: "Session deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export {
    createSession,
    getSessionsByLesson,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
};
