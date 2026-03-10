import 'dotenv/config';
import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

console.log("Starting server. JWT_SECRET check:", process.env.JWT_SECRET ? "Present" : "Missing");
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
