const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./src/schemas/User'); // Adjust path as needed
const MongoDB = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const FreeNote = require('./src/schemas/FreeNote'); // Adjust path as needed
const ObjectId = require('mongodb').ObjectId;


// ...rest of your server setup (like MongoDB connection)


// Replace with your MongoDB URI
const mongoURI = 'mongodb+srv://andre:andre123@cluster0.tss60.mongodb.net/Notes-App?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Middleware to parse JSON
app.use(express.json());

let db = mongoose.connection;

// Example route
app.get('/', (req, res) => {
    res.send('Hello from the notes app server!');
});

app.use(express.json()); // To parse JSON request bodies

app.post('/register', async (req, res) => {
    try {
        // Extract user details from request body
        const { username, email, password, firstName, lastName} = req.body;
        console.log(req.body);

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            userId: new MongoDB.ObjectId(),
            username,
            email,
            password, // Store the hashed password, not the plain one,
            firstName, 
            lastName,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(password, salt);

        // Save the user
        await user.save();

        // Send a response (or handle JWT token creation for authentication)
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); //on the client side this is response.data.msg
        }

        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // User matched, create and send a JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Replace with your JWT secret key
            { expiresIn: '24h' }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/user/data', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Send back the user-specific data
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/api/freeNotes', async (req, res) => {
    try {
        // Extract note details from request body
        const { title, content } = req.body;

        //use the token to connect the user to the note
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user already exists
        let user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        //get the user id
        const userId = user.userId;

        // Create a new note
        const note = new FreeNote({
            title,
            content,
            userId
        });

        // Save the note
        db.collection('notes').insertOne(note);

        //add the note to the user's notes array
        user.notes.push(note._id);

        // Save the user
        await user.save();
        console.log(user.notes);

        // Send a response
        res.status(201).json({ msg: 'Note saved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get('/api/freeNotes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.put('/api/freeNotes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // This should contain the new note data

    try {
        // Code to find the note by id and update it with updatedData
        // For example, using a database operation
        const updatedNote = await NoteModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedNote) {
            return res.status(404).send('Note not found');
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


app.get('/api/user/notes', async (req, res) => {
    try {
        // Extract user ID from the token
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        const userId = decoded.user.id;

        // check if token is valid
        if (!userId) {
            return res.status(404).json({ msg: 'User not found' });
        }

        //check if token is expired
        // if(decoded.exp < Date.now()){
        //     return res.status(404).json({ msg: 'Token expired' });
        // }

        // // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // console.log(user.notes);

        // Assuming 'notes' is an array of note IDs in the user document
        const notes = await db.collection("notes").find({
            _id: { $in: user.notes.map(id => new ObjectId(id)) }
        }).toArray();

        // Send the notes to the client
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Choose a port
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

