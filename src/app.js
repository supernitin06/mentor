import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Swagger document (auto-generated)
const swaggerPath = path.join(__dirname, '../swagger-output.json');
let swaggerDocument = {};
if (fs.existsSync(swaggerPath)) {
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
}

import errorMiddleware from './middleware/error.middleware.js';
import apiRoutes from './routes/api.routes.js';
import llmRoutes from './modules/llm/llm.route.js';

const app = express();

// Middlewares
const allowedOrigins = process.env.CORS_ORIGINS === '*'
    ? true
    : (process.env.CORS_ORIGINS || 'https://mentorui-ecru.vercel.app,http://localhost:5173,http://localhost:3000').split(',').map(o => o.trim());

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins === true || !origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Swagger Documentation
if (Object.keys(swaggerDocument).length > 0) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Routes
app.get('/', (req, res) => {
    /* #swagger.tags = ['General'] */
    res.status(200).json({
        message: 'Welcome to the Mentor-Student-Parent API',
        status: 'Active',
        docs: '/api-docs'
    });
});

app.use('/api', apiRoutes);
app.use('/llm', llmRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
