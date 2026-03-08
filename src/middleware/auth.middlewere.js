import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role === "MENTOR"){
            const mentor = await prisma.mentor.findUnique({
                where: { id: decoded.id },
            });
            if (!mentor) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            req.user = mentor;
        }

        if(decoded.role === "STUDENT"){
            const student = await prisma.student.findUnique({
                where: { id: decoded.id },
            });
            if (!student) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            req.user = student;
        }

        if(decoded.role === "PARENT"){
            const parent = await prisma.parent.findUnique({
                where: { id: decoded.id },
            });
            if (!parent) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            req.user = parent;
        }


        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;