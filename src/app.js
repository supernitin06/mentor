import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

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

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
