import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerGenerator = swaggerAutogen();

const doc = {
    info: {
        title: 'Mentor-Student-Parent API',
        description: 'API Documentation for the Mentor Management System',
    },
    tags: [
        { name: 'Student', description: 'Student management' },
        { name: 'Mentor', description: 'Mentor management' },
        { name: 'Parent', description: 'Parent management' },
    ],
    host: 'localhost:5000',
    basePath: '/',
    schemes: ['http'],
};

const outputFile = path.join(__dirname, '../../swagger-output.json');
// Use relative path for endpointsFiles as it's more reliable for some parsers
const endpointsFiles = ['../../src/app.js'];

swaggerGenerator(outputFile, endpointsFiles, doc);
