import prisma from "../../config/db.js";
import { parentZodSchema } from "./parent.validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerParent = async (data) => {
    const validated = parentZodSchema.parse(data);

    const existingParent = await prisma.parent.findUnique({
        where: { email: validated.email },
    });
    if (existingParent) {
        throw new Error("Parent already exists");
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const parent = await prisma.parent.create({
        data: {
            name: validated.name,
            email: validated.email,
            phone: validated.phone,
            password: hashedPassword,
            age: validated.age,
            gender: validated.gender,
            address: validated.address,
            parentimage: validated.parentimage,
        },
    });
    return parent;
};

const parentLogin = async (email, password) => {
    const parent = await prisma.parent.findUnique({
        where: { email },
    });
    if (!parent) {
        throw new Error("Parent not found");
    }
    const isPasswordValid = await bcrypt.compare(password, parent.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: parent.id, role: parent.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, parent };
};

const getAllParents = async () => {
    const parents = await prisma.parent.findMany();
    return parents;
};

const lessonAssign = async (data) => {
    const { studentId, lessonId } = data;

    // Verify student exists
    const student = await prisma.student.findUnique({
        where: { id: studentId }
    });
    if (!student) throw new Error("Student not found");

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId }
    });
    if (!lesson) throw new Error("Lesson not found");

    // Create assignment
    const assignment = await prisma.lessonAssign.upsert({
        where: {
            studentId_lessonId: {
                studentId,
                lessonId
            }
        },
        update: {}, // If it already exists, do nothing
        create: {
            studentId,
            lessonId
        }
    });

    return assignment;
};

const removeLessonAssignment = async (data) => {
    const { studentId, lessonId } = data;

    const deleted = await prisma.lessonAssign.delete({
        where: {
            studentId_lessonId: {
                studentId,
                lessonId
            }
        }
    });

    return deleted;
};

export { registerParent, getAllParents, parentLogin, lessonAssign, removeLessonAssignment };
