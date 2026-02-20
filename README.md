# OTP Authentication System

A secure Node.js REST API for user authentication using One-Time Passwords (OTP) sent via email.
Users register, verify their email with an OTP, and log in to access protected routes. This is Backend only.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Email:** Nodemailer + Gmail SMTP
- **Authentication:** express-session
- **Environment:** dotenv

## Setup & Installation

#### step 1 - Clone the repository

```bash
git clone https://gi](https://github.com/Thewni03/get_otp.git
```

#### step 2 - Install dependencies

```bash
npm install
```

#### step 3 - Create a `.env` file in the root directory

```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> Use a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password. 2-Step Verification must be enabled.

#### step 4 - Update the MongoDB connection

In `Config/db.js`, replace the `MONGO_URL` with your own MongoDB Atlas connection string.

#### step 5 - Start the server

```bash
node app.js
```

Server runs on `http://localhost:3000`


### For Your Information

- OTP is valid for **10 minutes** only
- Passwords are stored as plain text — consider adding **bcrypt** for production
- Sessions are stored in memory — consider **connect-mongo** for production

### Thewni Mahathantri
feel free to use and modify.
