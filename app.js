const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./user.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    contact TEXT
)`);

// Serve Register Page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle User Registration
app.post('/register', async (req, res) => {
    const { fullName, email, password, contact } = req.body;

    if (!fullName || !email || !password || !contact) {
        console.log(fullName);
        console.log(email);
        console.log(password);
        console.log(contact);
        return res.send('All fields are required.');
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        db.run(`INSERT INTO user (full_name, email, password, contact) VALUES (?, ?, ?, ?)`, 
            [fullName, email, hashedPassword, contact], 
            function (err) {
                if (err) {
                    console.error(err.message);
                    console.log(fullName);
                    console.log(email);
                    console.log(password);
                    console.log(contact);
                    return res.send('Error: Email already exists.');
                }
                    console.log(fullName);
                    console.log(email);
                    console.log(password);
                    console.log(contact);
                console.log('User registered successfully.');
                res.redirect('/login'); // Redirect to login page
            }
        );
    } catch (error) {
        console.error(error);
        res.send('Server error, please try again.');
    }
});

// Serve Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public' ,'login.html'));
});

app.post('/login', (request, response) => {
    const {email, password} = request.body;

    if(!email || ! password)
    {
        console.error(email);
        console.error(password);
        return response.send('Please provide both email and password.');
    }

    db.get('SELECT * FROM user where email = ?', [email], async (err, row) => {
        if(err) {
            console.log(err.message);
            return response.send('An error occurred');
        }

        if(!row)
        {
            return response.send('User not found!');
        }

        const isPasswordValid = await bcrypt.compare(password, row.password);

        if(isPasswordValid)
        {
            response.redirect('/SportsWear.html');
        }
        else
        {
            return response.send('Invalid Password');
        }
    });
});

app.get('/checkout', (request, response) => {
    response.sendFile(path.join(__dirname, 'public' ,'checkout.html'));
});

app.post('/placeorder', (request, response) => {
    response.sendFile(path.join(__dirname, 'public' ,'orderplaced.html'));
});

// Start Server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
