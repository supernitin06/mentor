import prisma from "../config/db.js";

const parentMiddleware = () => {
    return async (req, res, next) => {
        try {
            const user = await prisma.parent.findUnique({
                where: { id: req.user.id },
            });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            if (user.role !== "PARENT") {
                return res.status(403).json({
                    success: false,
                    message: "Only parent can access this route",
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default parentMiddleware;