const mongoose = require('mongoose');
const Log = require('../Log');
require('dotenv').config();

module.exports = class DatabaseFunctions {
  dbClient;
  userModel;

  constructor() {
    this.userModel = mongoose.model(
      'Discord',
      new mongoose.Schema(
        {
          _id: String,
          name: String,
          balance: Number,
        },
        {
          versionKey: false,
          collection: 'Users',
          timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        }
      )
    );
  }

  init() {
    Log('Initializing Database...', 0, 'Database');
    mongoose.connect(uri).then(() => {
      this.dbClient = mongoose.connection.useDb('Discord');
      Log('Database initialized', 0, 'Database');
    });
  }

  async getUser({ _id }) {
    const user = await this.userModel.findById(_id);
    return user;
  }

  async createUser({ _id, name, balance = 0 }) {
    const user = new this.userModel({
      _id: _id,
      name: name,
      balance: balance,
    });

    // check if user already exists
    const exists = await this.userModel.findById(_id);
    if (!exists) await user.save();
  }

  async updateUser({ _id, name, balance }) {
    await this.userModel.findByIdAndUpdate(_id, {
      name: name,
      balance: balance,
    });
  }

  async deleteUser({ _id }) {
    await this.userModel.findByIdAndDelete(_id);
  }

  async close() {
    await this.dbClient.close();
  }
};
