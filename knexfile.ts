import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();


const adminDB: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/migrations",
    },
    seeds: {
        directory: "./src/seeds",
    },
};

const userDB: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/migrations",
    },
    seeds: {
        directory: "./src/seeds",
    },
};

const vendorDB: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/migrations",
    },
    seeds: {
        directory: "./src/seeds",
    },

};

export default { adminDB, userDB, vendorDB };
