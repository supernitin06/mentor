import * as studentService from "./student.service.js";

const registerStudent = async (req, res, next) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, mentorId, notes } = req.body;
        const parentId = req.user.id; // From authMiddleware
        const studentimage = req.file?.path;

        const result = await studentService.registerStudent({
            firstName,
            lastName,
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

export { registerStudent, getAllStudents };