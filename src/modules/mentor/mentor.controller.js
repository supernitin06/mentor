import * as mentorService from "./mentor.service.js";

const registerMentor = async (req, res, next) => {
    try {
        const result = await mentorService.registerMentor(req, res, next);
        res.status(201).json({
            success: true,
            message: "Mentor registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllMentors = async (req, res, next) => {
    try {
        const result = await mentorService.getAllMentors(req, res, next);
        res.status(200).json({
            success: true,
            message: "Mentors fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export { registerMentor, getAllMentors };