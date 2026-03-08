import prisma from "../../config/db.js";

const registerMentor = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, lesson, specialization } = req.body;


        const existingMentor = await prisma.mentor.findUnique({
            where: { email },
        });
        if (existingMentor) {
            return res.status(400).json({
                success: false,
                message: "Mentor already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const mentor = await prisma.mentor.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                address,
                specialization,
            },
        });
        res.status(201).json({
            success: true,
            data: mentor,
        });
    } catch (error) {
        next(error);
    }
};

const mentorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const mentor = await prisma.mentor.findUnique({
            where: { email },
        });
        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, mentor.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jwt.sign({ id: mentor.id, role: mentor.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });


        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            data: mentor,
        });
    } catch (error) {
        next(error);
    }
};



const getAllMentors = async (req, res, next) => {
    try {
        const mentors = await prisma.mentor.findMany();
        res.status(200).json({ success: true, data: mentors });
    } catch (error) {
        next(error);
    }
};





export { registerMentor, getAllMentors };