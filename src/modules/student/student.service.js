import prisma from "../../config/db.js";

const registerStudent = async (req, res, next) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, parentId } = req.body;
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                parentId,
            },
        });
        res.status(201).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

const getAllStudents = async (req, res, next) => {
    try {
        const students = await prisma.student.findMany();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        next(error);
    }
};

export { registerStudent, getAllStudents };