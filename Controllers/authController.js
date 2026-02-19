const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helpers
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const sendOtpEmail = (to, otp, subject = 'OTP Verification') =>
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: `Your OTP is: ${otp}`
    });

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; // fixed: 'emaiil' typo

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // fixed: was 'otpExpiary'

        user = new User({ name, email, password, otp, otpExpiry });
        await user.save();

        await sendOtpEmail(email, otp);

        res.status(201).json({ message: 'User registered. Please verify the OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        // fixed: was checking isVerified instead of otp/expiry
        if (user.otp !== otp || user.otpExpiry < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendOtpEmail(email, otp, 'Resend OTP Verification'); // fixed: was 'await.transporter' and semicolon in object

        res.json({ message: 'OTP resent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resending OTP', error });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.password !== password) return res.status(400).json({ message: 'Incorrect password' });
        if (!user.isVerified) return res.status(400).json({ message: 'Email not verified. Please verify your OTP.' });

        req.session.user = { id: user._id, email: user.email, name: user.name };

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Error logging out' });
        res.json({ message: 'Logged out successfully' });
    });
};

// Dashboard (protected)
exports.dashboard = (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ message: `Welcome back, ${req.session.user.name}!` });
};