const mongoose = require('mongoose');
const User = require('../models/user');

const MONGO_URL = "ur url";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected Successfully');

    await User.createCollection();
    console.log('User collection created successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};


module.exports = connectDB;
