import * as parentService from "./parent.services.js";

const registerParent = async (req, res, next) => {
    try {
        const { name, email, phone, age, gender, address, password } = req.body;
        const parentimage = req.file?.path;
        const result = await parentService.registerParent({ name, email, phone, age, gender, address, parentimage, password });
        res.status(201).json({
            success: true,
            message: "Parent registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const parentLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await parentService.parentLogin(email, password);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: true, // Always true for cross-domain cookies in production
            sameSite: 'none', // Needed for cross-domain (Vercel -> Render)
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Parent logged in successfully",
            data: { token: result.token, parent: result.parent },
        });
    } catch (error) {
        next(error);
    }
};

const getAllParents = async (req, res, next) => {
    try {
        const result = await parentService.getAllParents();
        res.status(200).json({
            success: true,
            message: "Parents fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



const assignlessontostudent = async (req, res, next) => {
    try {
        const result = await parentService.lessonAssign(req.body);
        res.status(200).json({
            success: true,
            message: "Lesson assigned to student successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const removeLessonAssignment = async (req, res, next) => {
    try {
        const result = await parentService.removeLessonAssignment(req.body);
        res.status(200).json({
            success: true,
            message: "Lesson removed from student successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { registerParent, getAllParents, parentLogin, assignlessontostudent, removeLessonAssignment };
