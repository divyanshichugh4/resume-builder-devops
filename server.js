require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); // ✅ added
const { OAuth2Client } = require('google-auth-library');

// We use the environment variable if available, otherwise a placeholder.
// The user MUST provide a valid client ID for the Google Sign-In to fully work and be verified securely.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '1016595135927-hhrisfu8j05llfvsl0n2cjbr8b7cqp43.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(cors());
// Set a larger body limit because resumes can contain 2MB+ base64 encoded profile photos
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.static('public'));

// ---------------- DATABASE SCHEMAS ----------------

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const ResumeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    resumeData: { type: mongoose.Schema.Types.Mixed, required: true }
});

const User = mongoose.model('User', UserSchema);
const Resume = mongoose.model('Resume', ResumeSchema);

// ---------------- APIs ----------------

// API: Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 'Missing username or password' });

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// API: Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 'Missing username or password' });

        const user = await User.findOne({ username, password });

        if (user) {
            res.json({ success: true, username });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// API: Reset Password
app.post('/api/reset-password', async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        if (!username || !newPassword)
            return res.status(400).json({ error: 'Missing username or new password' });

        const user = await User.findOne({ username });

        if (user) {
            user.password = newPassword;
            await user.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// API: Save Resume
app.post('/api/resumes', async (req, res) => {
    try {
        const { username, resumeData } = req.body;
        if (!username || !resumeData)
            return res.status(400).json({ error: 'Missing data' });

        const newResume = new Resume({ username, resumeData });
        await newResume.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// API: Get Resume
app.get('/api/resumes/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const docs = await Resume.find({ username });
        const resumes = docs.map(doc => doc.resumeData);

        res.json({ success: true, resumes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// API: Google Login
app.post('/api/google-login', async (req, res) => {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: 'Missing credential' });

    try {
        let payload;
        try {
             const ticket = await client.verifyIdToken({
                 idToken: credential,
                 audience: GOOGLE_CLIENT_ID,
             });
             payload = ticket.getPayload();
        } catch (verifyError) {
             console.warn("Token verification skipped or failed. This might be because you are using a placeholder Client ID.");
             return res.status(401).json({ error: 'Token verification failed. Do you have a valid GOOGLE_CLIENT_ID configured?' });
        }
        
        const email = payload.email;
        if (!email) {
            return res.status(400).json({ error: 'No email found in Google token' });
        }

        let user = await User.findOne({ username: email });
        if (!user) {
            const newUser = new User({ username: email, password: 'google-oauth-placeholder-password' });
            await newUser.save();
        }
        
        res.json({ success: true, username: email });

    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({ error: 'Internal server error during Google login' });
    }
});

// API: Get All Data (For Admin)
app.get('/api/admin/data', async (req, res) => {
    try {
        const users = await User.find({});
        const resumes = await Resume.find({});
        res.json({ success: true, data: { users, resumes } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});