const express = require('express');
const connectDB = require('./Config/db');
const session = require('express-session')
// Connect MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use(session({
    secret: 'supersecretkey',
    resave:false,
    saveUninitialized: true,
    cookie:{secure:false}
}));
const authRoutes = require('./Routes/authRoutes');

app.use('/api/auth',authRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
