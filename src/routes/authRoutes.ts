import express from 'express';
import { AuthController } from '../controllers/authController';
import { Knex } from 'knex';
import { authenticateToken } from '../middleware/authMiddleware';

export function createAuthRouter(db: Knex) {
    const router = express.Router();
    const authController = new AuthController(db);

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - display_name
     *               - email
     *               - password
     *               - identity
     *             properties:
     *               display_name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               identity:
     *                 type: string
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Invalid input
     */
    router.post('/register', authController.register.bind(authController));

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Log in a user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     *       400:
     *         description: Invalid credentials
     */
    router.post('/login', authController.login.bind(authController));

    /**
     * @swagger
     * /api/auth/profile:
     *   get:
     *     summary: Get user profile
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User profile retrieved successfully
     *       401:
     *         description: Unauthorized
     */
    router.get('/profile', authenticateToken, authController.getProfile.bind(authController));

    return router;
}