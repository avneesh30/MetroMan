import knex from 'knex';
import knexConfigs from '../../knexfile';

const adminDB = knex(knexConfigs.adminDB);
const userDB = knex(knexConfigs.userDB);
const vendorDB = knex(knexConfigs.vendorDB);

export { adminDB, userDB, vendorDB };
