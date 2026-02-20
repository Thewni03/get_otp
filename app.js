require('dotenv').config();
const express = require('express');
const session = require('express-session');

const connectDB = require('./Config/db');

// Connect MongoDB
connectDB();

const app = express();


app.use(express.json());

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


// ---------- Routes ---------- //

const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);


// ---------- Server ---------- //

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
