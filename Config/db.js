const mongoose = require('mongoose');
const User = require('../models/user');

const MONGO_URL = "mongodb+srv://thewni2003_db_user:87tvn6usDM8gsSfV@cluster0.nvzk1r0.mongodb.net/?appName=Cluster0";

const connectDB = async() => {

    try{
        await mongoose.connect(MONGO_URL);
        //,{
       //    useNewUrlParser:true,
       //     useUnifiedTopology:true
    //    });

        console.log('MongoDb connected Successfully');

        //create empty user collection

        await User.createCollection();
        console.log('User collection created successfully');


    }
    catch(err){
        console.error('MongoDB connection failed:' ,err.message);
        process.exit(1);
    }

};

connectDB();

module.exports = connectDB;
