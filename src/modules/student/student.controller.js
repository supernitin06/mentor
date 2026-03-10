
import * as studentService from "./student.service.js";

const registerStudent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, gender, mentorId, notes } = req.body;
        const parentId = req.user.id; // From authMiddleware
        const studentimage = req.file?.path;
        const result = await studentService.registerStudent({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            parentId,
            mentorId,
            studentimage,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const studentLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await studentService.studentLogin(email, password);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            message: "Student logged in successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllStudents = async (req, res, next) => {
    try {
        const result = await studentService.getAllStudents();
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



const getstudentbyparent = async (req, res, next) => {
    try {
        const result = await studentService.getstudentbyparent(req.user.id);
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getstudentbymentor = async (req, res, next) => {
    try {
        const result = await studentService.getstudentbymentor(req.user.id);
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { registerStudent, getAllStudents, studentLogin, getstudentbyparent, getstudentbymentor };