const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name :{type :String, requried:true},
    email:{type:String , requried:true , unique:true},
    password:{type:String, requried:true},
    otp:{type:String},
    otpExpiry:{type:Date},
    isVerified:{type:Boolean , default:false} 

});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;