import * as mentorService from "./mentor.service.js";

const registerMentor = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, lesson, specialization } = req.body;
        const mentorimage = req.file?.path;
        const result = await mentorService.registerMentor({ name, email, password, phone, address, lesson, specialization, mentorimage });
        res.status(201).json({
            success: true,
            message: "Mentor registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const mentorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { mentor, token } = await mentorService.mentorLogin({ email, password });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { token, mentor },
        });
    } catch (error) {
        next(error);
    }
};

const getAllMentors = async (req, res, next) => {
    try {
        const result = await mentorService.getAllMentors();
        res.status(200).json({
            success: true,
            message: "Mentors fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { registerMentor, mentorLogin, getAllMentors };