import prisma from "../../config/db.js";
import { studentZodSchema } from "./student.validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerStudent = async (data) => {
    const validated = studentZodSchema.parse(data);

    const existingStudent = await prisma.student.findUnique({
        where: { email: validated.email },
    });
    if (existingStudent) {
        throw new Error("Student already exists");
    }


    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const studentData = {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        password: hashedPassword,
        dateOfBirth: validated.dateOfBirth,
        gender: validated.gender,
        parentId: validated.parentId,
        studentimage: validated.studentimage,
        notes: validated.notes,
    };

    const student = await prisma.student.create({
        data: studentData,
    });
    return student;
};


const studentLogin = async (email, password) => {
    const student = await prisma.student.findUnique({
        where: { email },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    // Ensure role is set
    if (!student.role) {
        student.role = 'STUDENT';
    }
    const token = jwt.sign({ id: student.id, role: student.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { token, student };
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
            lessonAssigns: {
                select: {
                    lesson: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            }
        }
    });
    return students;
};

const getstudentbyparent = async (parentId) => {
    const students = await prisma.student.findMany({
        where: { parentId },
        include: {
            parent: {
                select: {
                    name: true,
                    email: true
                }
            },
            lessonAssigns: {
                select: {
                    lesson: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            }
        }
    });
    return students;
};

const getstudentbymentor = async (mentorId) => {
    const students = await prisma.student.findMany({
        where: { mentorId },
        include: {
            parent: {
                select: {
                    name: true,
                    email: true
                }
            },
            lessonAssigns: {
                select: {
                    lesson: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            }
        }
    });
    return students;
};


export { registerStudent, getAllStudents, studentLogin, getstudentbyparent, getstudentbymentor };