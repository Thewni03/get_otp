const mongoose = require('mongoose');
const User = require('../models/user');

const MONGO_URL = "mongodb+srv://thewni2003_db_user:87tvn6usDM8gsSfV@cluster0.nvzk1r0.mongodb.net/otpDB?retryWrites=true&w=majority";

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
