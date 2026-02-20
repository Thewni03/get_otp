const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://thewni2003_db_user:87tvn6usDM8gsSfV@cluster0.nvzk1r0.mongodb.net/otpDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL).then(async () => {
    await mongoose.connection.collection('users').deleteMany({});
    console.log('All users cleared');
    process.exit();
});
