import prisma from "../config/db.js";

const mentorMiddleware = () => {
    return async (req, res, next) => {
        try {
            const user = await prisma.mentor.findUnique({
                where: { id: req.user.id },
            });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            if (user.role !== "MENTOR") {
                return res.status(403).json({
                    success: false,
                    message: "Only mentor can access this route",
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default mentorMiddleware;
