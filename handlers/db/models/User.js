const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
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
