import { Knex } from 'knex';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - display_name
 *         - email
 *         - identity
 *         - unique_user_id
 *       properties:
 *         id:
 *           type: number
 *         display_name:
 *           type: string
 *         email:
 *           type: string
 *         identity:
 *           type: string
 *         unique_user_id:
 *           type: number
 *         bio:
 *           type: string
 *         login_type:
 *           type: number
 *         platform_type:
 *           type: number
 *         
 */

export interface UserAttributes {
    id?: number;
    display_name: string;
    bio: string;
    identity: string;
    fcm_token: string | null;
    login_type: 0 | 1;
    platform_type: 0 | 1;
    email: string;
    auth_token: string | null;
    channel: string | null;
    live_streaming_id: string | null;
    agora_uid: number;
    withdrawal_diamond: number;
    gender: string | null;
    registration_date: string | null;
    unique_user_id: bigint;
    mobile_number: string | null;
    profile_image_url: string | null;
    video_url: string | null;
    cover_image_url: string | null;
    age: number | null;
    date_of_birth: string;
    diamond_balance: number;
    coin_balance: number;
    country: string;
    is_online: boolean;
    is_busy: boolean;
    is_live: boolean;
    is_blocked: boolean;
    is_fake_account: boolean;
    has_coin_plan: boolean;
    purchased_coins: number;
    follower_count: number;
    following_count: number;
    plan_start_date: string | null;
    coin_plan_id: string | null;
    created_at?: Date;
    updated_at?: Date;

}

export class User implements UserAttributes {
    id?: number;
    display_name: string;
    bio: string;
    identity: string;
    fcm_token: string | null;
    login_type: 0 | 1;
    platform_type: 0 | 1;
    email: string;
    auth_token: string | null;
    channel: string | null;
    live_streaming_id: string | null;
    agora_uid: number;
    withdrawal_diamond: number;
    gender: string | null;
    registration_date: string | null;
    unique_user_id: bigint;
    mobile_number: string | null;
    profile_image_url: string | null;
    video_url: string | null;
    cover_image_url: string | null;
    age: number | null;
    date_of_birth: string;
    diamond_balance: number;
    coin_balance: number;
    country: string;
    is_online: boolean;
    is_busy: boolean;
    is_live: boolean;
    is_blocked: boolean;
    is_fake_account: boolean;
    has_coin_plan: boolean;
    purchased_coins: number;
    follower_count: number;
    following_count: number;
    plan_start_date: string | null;
    coin_plan_id: string | null;
    created_at?: Date;
    updated_at?: Date;

    constructor(attributes: UserAttributes) {
        this.id = attributes.id;
        this.display_name = attributes.display_name;
        this.bio = attributes.bio;
        this.identity = attributes.identity;
        this.fcm_token = attributes.fcm_token;
        this.login_type = attributes.login_type;
        this.platform_type = attributes.platform_type;
        this.email = attributes.email;
        this.auth_token = attributes.auth_token;
        this.channel = attributes.channel;
        this.live_streaming_id = attributes.live_streaming_id;
        this.agora_uid = attributes.agora_uid;
        this.withdrawal_diamond = attributes.withdrawal_diamond;
        this.gender = attributes.gender;
        this.registration_date = attributes.registration_date;
        this.unique_user_id = attributes.unique_user_id;
        this.mobile_number = attributes.mobile_number;
        this.profile_image_url = attributes.profile_image_url;
        this.video_url = attributes.video_url;
        this.cover_image_url = attributes.cover_image_url;
        this.age = attributes.age;
        this.date_of_birth = attributes.date_of_birth;
        this.diamond_balance = attributes.diamond_balance;
        this.coin_balance = attributes.coin_balance;
        this.country = attributes.country;
        this.is_online = attributes.is_online;
        this.is_busy = attributes.is_busy;
        this.is_live = attributes.is_live;
        this.is_blocked = attributes.is_blocked;
        this.is_fake_account = attributes.is_fake_account;
        this.has_coin_plan = attributes.has_coin_plan;
        this.purchased_coins = attributes.purchased_coins;
        this.follower_count = attributes.follower_count;
        this.following_count = attributes.following_count;
        this.plan_start_date = attributes.plan_start_date;
        this.coin_plan_id = attributes.coin_plan_id;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at;
    }

    static async findById(db: Knex, id: number): Promise<User | undefined> {
        const user = await db<UserAttributes>('users').where({ id }).first();
        return user ? new User(user) : undefined;
    }

    static async findByEmail(db: Knex, email: string): Promise<User | undefined> {
        const user = await db<UserAttributes>('users').where({ email }).first();
        return user ? new User(user) : undefined;
    }

    static async create(db: Knex, attributes: Omit<UserAttributes, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
        const [id] = await db<UserAttributes>('users').insert(attributes);
        const user = await User.findById(db, id);
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }

    async update(db: Knex, attributes: Partial<UserAttributes>): Promise<User> {
        await db<UserAttributes>('users').where({ id: this.id }).update(attributes);
        Object.assign(this, attributes);
        return this;
    }

    async delete(db: Knex): Promise<void> {
        await db<UserAttributes>('users').where({ id: this.id }).del();
    }

    toJSON(): Omit<UserAttributes, 'auth_token'> {
        const { auth_token, ...userWithoutToken } = this;
        return userWithoutToken;
    }
}