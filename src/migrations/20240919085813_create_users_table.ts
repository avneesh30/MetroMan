import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('display_name').defaultTo('');
        table.text('bio').defaultTo('I am Social User ☺');
        table.string('identity').notNullable();
        table.string('fcm_token');
        table.integer('login_type').unsigned().checkBetween([0, 1]);
        table.integer('platform_type').unsigned().defaultTo(0).checkBetween([0, 1]);
        table.string('email').defaultTo('');
        table.string('auth_token');
        table.string('channel');
        table.string('live_streaming_id');
        table.integer('agora_uid').unsigned().defaultTo(0);
        table.integer('withdrawal_diamond').unsigned().defaultTo(0);
        table.string('gender');
        table.string('registration_date');
        table.bigInteger('unique_user_id').unsigned().unique().notNullable();
        table.string('mobile_number');
        table.string('profile_image_url');
        table.string('video_url');
        table.string('cover_image_url');
        table.integer('age').unsigned();
        table.string('date_of_birth').defaultTo('01/01/2000');
        table.integer('diamond_balance').unsigned().defaultTo(0);
        table.integer('coin_balance').unsigned().defaultTo(800);
        table.string('country').defaultTo('');
        table.boolean('is_online').defaultTo(false);
        table.boolean('is_busy').defaultTo(false);
        table.boolean('is_live').defaultTo(false);
        table.boolean('is_blocked').defaultTo(false);
        table.boolean('is_fake_account').defaultTo(false);
        table.boolean('has_coin_plan').defaultTo(false);
        table.integer('purchased_coins').unsigned().defaultTo(0);
        table.integer('follower_count').unsigned().defaultTo(0);
        table.integer('following_count').unsigned().defaultTo(0);
        table.string('plan_start_date');
        table.string('coin_plan_id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}