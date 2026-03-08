import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mentorZodSchema } from "./mentor.validation.js";

const registerMentor = async (data, req) => {
    const validated = mentorZodSchema.parse(data);

    const existingMentor = await prisma.mentor.findUnique({
        where: { email: validated.email },
    });
    if (existingMentor) {
        throw new Error("Mentor already exists");
    }


    const hashedPassword = await bcrypt.hash(validated.password, 10);
    const mentor = await prisma.mentor.create({
        data: {
            name: validated.name,
            email: validated.email,
            password: hashedPassword,
            phone: validated.phone,
            address: validated.address,
            specialization: validated.specialization,
            mentorimage: validated.mentorimage,
        },
    });
    return mentor;
};

const mentorLogin = async (data) => {
    const validated = mentorZodSchema.pick({ email: true, password: true }).parse(data);

    const mentor = await prisma.mentor.findUnique({
        where: { email: validated.email },
    });
    if (!mentor) {
        throw new Error("Mentor not found");
    }

    const isPasswordValid = await bcrypt.compare(validated.password, mentor.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: mentor.id, role: mentor.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return { mentor, token };
};

const getAllMentors = async () => {
    const mentors = await prisma.mentor.findMany();
    return mentors;
};


export { registerMentor, mentorLogin, getAllMentors };