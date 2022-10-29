const User = require('./models/User');
const mongoose = require('mongoose');
const Log = require('../Log');
require('dotenv').config();

module.exports = class DatabaseFunctions {
  dbClient;

  constructor() {}

  init() {
    Log('Initializing Database...', 1, 'Database');
    mongoose.connect(process.env.DB_URI).then(() => {
      this.dbClient = mongoose.connection.useDb('Discord');
      Log('Database initialized', 3, 'Database');
    });
  }

  async getUser({ _id }) {
    const user = await User.findById(_id);
    return user;
  }

  async createUser({ _id, name, balance = 0 }) {
    const user = new User({
      _id: _id,
      name: name,
      balance: balance,
    });

    // check if user already exists
    const exists = await User.findById(_id);
    if (!exists) await user.save();
  }

  async updateUser({ _id, name, balance }) {
    await User.findByIdAndUpdate(_id, {
      name: name,
      balance: balance,
    });
  }

  async deleteUser({ _id }) {
    await User.findByIdAndDelete(_id);
  }

  async close() {
    await this.dbClient.close();
  }
};
