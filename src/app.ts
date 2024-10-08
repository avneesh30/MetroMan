import express from "express";
import http from "http";
import dotenv from "dotenv";
import knex from "knex";
import knexConfig from "../knexfile";
import { createAuthRouter } from "./routes/authRoutes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { authenticateToken } from './middleware/authMiddleware';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);

const db = knex(knexConfig.development);


const isProduction = false;
const BASE_URL = isProduction ? 'https://softwarera.com' : `http://localhost:${process.env.PORT || 3000}`;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://softwarera.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to add base URL to req object
app.use((req, res, next) => {
    req.baseUrl = BASE_URL;
    next();
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Auth routes
app.use('/api/auth', createAuthRouter(db));

// Protect all routes after this middleware
app.use(authenticateToken);

// Add your other routes here
// app.use('/api/posts', createPostRouter(db));
// app.use('/api/likes', createLikeRouter(db));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
    console.log(`Swagger UI available at ${BASE_URL}/api-docs`);
});

export { app, db };