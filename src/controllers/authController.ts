import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';
import { User, UserAttributes } from '../models/userTable';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/authMiddleware';


export class AuthController {
    constructor(private db: Knex) { }

    async register(req: Request, res: Response) {
        const { display_name, email, password, identity } = req.body;

        if (!display_name || !email || !password || !identity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Check if user already exists
            const existingUser = await User.findByEmail(this.db, email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);


            // Create new user
            const newUser = await User.create(this.db, {
                display_name,
                email,
                identity,
                unique_user_id: BigInt(Date.now()), // This will generate a unique string ID
                auth_token: hashedPassword,
                bio: 'I am a Social User ☺',
                login_type: 0,
                platform_type: 0,
                agora_uid: 0,
                withdrawal_diamond: 0,
                date_of_birth: '01/01/2000',
                diamond_balance: 0,
                coin_balance: 800,
                country: '',
                is_online: false,
                is_busy: false,
                is_live: false,
                is_blocked: false,
                is_fake_account: false,
                has_coin_plan: false,
                purchased_coins: 0,
                follower_count: 0,
                following_count: 0,
                fcm_token: null,
                channel: null,
                live_streaming_id: null,
                gender: null,
                registration_date: new Date().toISOString(),
                mobile_number: null,
                profile_image_url: null,
                video_url: null,
                cover_image_url: null,
                age: null,
                plan_start_date: null,
                coin_plan_id: null
            });
            // Generate JWT
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

            res.status(201).json({ user: newUser.toJSON(), token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Find user
            const user = await User.findByEmail(this.db, email);
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check if auth_token exists
            if (!user.auth_token) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.auth_token);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

            res.json({ user: user.toJSON(), token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const user = await User.findById(this.db, req.user!.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.toJSON());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}