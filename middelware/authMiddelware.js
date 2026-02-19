const express = require('express');
const {register ,verifyOtp , resendOtp , login ,logout , dashboard}= require('../Controllers/authController');
const authMiddelware = require('../middelware/authMiddelware');

const router = express.Router();

router.post('/register',register);
router.post('/verifyOtp',verifyOtp);
router.post('/resendOtp',resendOtp);
router.post('/login',login);
router.post('/logout',logout);
router.post('/dashboard',authMiddelware,dashboard);

module.exports = router;

