const knex = require('knex');
const Log = require('../Log');

module.exports = class DatabaseFunctions {
  client;
  dbClient;

  constructor(discordClient) {
    this.client = discordClient;
    this.dbClient = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
    });
  }

  async init() {
    Log('Database initialized', 0, 'Database');

    this.dbClient.schema.hasTable('users').then(async (exists) => {
      if (!exists) {
        await this.dbClient.schema.createTable('users', (table) => {
          table.string('id').primary();
          table.string('username');
          table.integer('balance');
        });

        Log('Created users table', 0, 'Database');
      }
    });
  }

  async getUser(id) {
    const user = await this.dbClient('users').where('id', id).first();
    return user;
  }

  async createUser(id, username) {
    await this.dbClient('users').insert({
      id,
      username,
      balance: 0,
    });
  }

  async updateUser({ id, username, balance }) {
    await this.dbClient('users').where('id', id).update({
      username,
      balance,
    });
  }

  async deleteUser(id) {
    await this.dbClient('users').where('id', id).del();
  }
};
