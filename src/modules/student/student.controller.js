import * as studentService from "./student.service.js";

const registerStudent = async (req, res, next) => {
    try {
        const result = await studentService.registerStudent(req, res, next);
        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllStudents = async (req, res, next) => {
    try {
        const result = await studentService.getAllStudents(req, res, next);
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { registerStudent, getAllStudents };