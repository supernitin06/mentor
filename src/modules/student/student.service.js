import prisma from "../../config/db.js";
import { studentZodSchema } from "./student.validation.js";

const registerStudent = async (data) => {
    const validated = studentZodSchema.parse(data);

    const student = await prisma.student.create({
        data: {
            firstName: validated.firstName,
            lastName: validated.lastName,
            dateOfBirth: validated.dateOfBirth,
            gender: validated.gender,
            parentId: validated.parentId,
            mentorId: validated.mentorId,
            studentimage: validated.studentimage,
            notes: validated.notes,
        },
    });
    return student;
};

const getAllStudents = async () => {
    const students = await prisma.student.findMany({
        include: {
            parent: {
                select: {
                    name: true,
                    email: true
                }
            },
            mentor: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
    return students;
};

export { registerStudent, getAllStudents };