const express = require('express');
const router = express.Router();

const {
  register,
  verifyOTP,   // ← capital OTP
  resendOTP,
  login,
  logout,
  dashboard
} = require('../Controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');


// Routes

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/logout', logout);
router.get('/dashboard', authMiddleware, dashboard);


module.exports = router;
