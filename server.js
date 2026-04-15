const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
// Set a larger body limit because resumes can contain 2MB+ base64 encoded profile photos
app.use(bodyParser.json({limit: '20mb'})); 
app.use(express.static('public'));

// Load data helper
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { users: [], resumes: {} };
    }
    try {
        const raw = fs.readFileSync(DATA_FILE);
        return JSON.parse(raw);
    } catch(err) {
        return { users: [], resumes: {} };
    }
};

// Save data helper
const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API: Register
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    
    let data = loadData();
    if (data.users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    data.users.push({ username, password });
    saveData(data);
    res.json({ success: true });
});

// API: Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ error: 'Missing username or password' });

    let data = loadData();
    let user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, username: username });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// API: Reset Password
app.post('/api/reset-password', (req, res) => {
    const { username, newPassword } = req.body;
    if(!username || !newPassword) return res.status(400).json({ error: 'Missing username or new password' });

    let data = loadData();
    let user = data.users.find(u => u.username === username);
    if (user) {
        user.password = newPassword;
        saveData(data);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// API: Save Resume
app.post('/api/resumes', (req, res) => {
    const { username, resumeData } = req.body;
    if (!username || !resumeData) return res.status(400).json({ error: 'Missing data' });
    
    let data = loadData();
    if (!data.resumes[username]) {
        data.resumes[username] = [];
    } else if (!Array.isArray(data.resumes[username])) {
        data.resumes[username] = [data.resumes[username]];
    }
    data.resumes[username].push(resumeData);
    saveData(data);
    res.json({ success: true });
});

// API: Get Resume
app.get('/api/resumes/:username', (req, res) => {
    const { username } = req.params;
    let data = loadData();
    let resumes = data.resumes[username];
    if (resumes) {
        if (!Array.isArray(resumes)) {
            resumes = [resumes];
        }
        res.json({ success: true, resumes: resumes });
    } else {
        res.json({ success: true, resumes: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
