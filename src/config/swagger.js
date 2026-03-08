import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerGenerator = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
    info: {
        title: 'Mentor-Student-Parent API',
        description: 'API Documentation for the Mentor Management System',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Local Development'
        }
    ],
    tags: [
        { name: 'Student', description: 'Student management' },
        { name: 'Mentor', description: 'Mentor management' },
        { name: 'Parent', description: 'Parent management' },
        { name: 'Lesson', description: 'Lesson management' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Student: {
                type: 'object',
                properties: {
                    studentimage: { type: 'string', format: 'binary', example: 'student.jpg' },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    dateOfBirth: { type: 'string', format: 'date', example: '2015-01-01' },
                    gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'], example: 'MALE' },
                    mentorId: { type: 'string', example: 'uuid-id-here' },
                    notes: { type: 'string', example: 'Needs help with math.' }
                },
                required: ['firstName', 'lastName']
            },
            Mentor: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'John Mentor' },
                    email: { type: 'string', example: 'mentor@example.com' },
                    password: { type: 'string', example: 'password123' },
                    phone: { type: 'string', example: '1234567890' },
                    address: { type: 'string', example: '123 Street, City' },
                    specialization: { type: 'string', example: 'Calculus' }
                },
                required: ['name', 'email', 'password', 'phone', 'address']
            },
            Login: {
                type: 'object',
                properties: {
                    email: { type: 'string', example: 'mentor@example.com' },
                    password: { type: 'string', example: 'password123' }
                },
                required: ['email', 'password']
            },
            Parent: {
                type: 'object',
                properties: {
                    parentimage: { type: 'string', example: 'parentimage.jpg' },
                    name: { type: 'string', example: 'Jane Parent' },
                    email: { type: 'string', example: 'parent@example.com' },
                    password: { type: 'string', example: 'password123' },
                    age: { type: 'number', example: 30 },
                    gender: { type: 'string', example: 'Female' },
                    phone: { type: 'string', example: '0987654321' },
                    address: { type: 'string', example: '123 Street, City' },
                },
                required: ['parentimage', 'name', 'email', 'password', 'age', 'gender', 'phone', 'address']
            },
            Lesson: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Mathematics' },
                    description: { type: 'string', example: 'Algebra and Calculus basics' }
                },
                required: ['name', 'description']
            }
        }
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const outputFile = path.join(__dirname, '../../swagger-output.json');
const endpointsFiles = ['../../src/app.js'];

swaggerGenerator(outputFile, endpointsFiles, doc);
