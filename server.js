const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./src/schemas/User'); // Adjust path as needed
const MongoDB = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Note = require('./src/schemas/Note'); // Adjust path as needed
const ObjectId = require('mongodb').ObjectId;
const Folder = require('./src/schemas/Folder'); // Adjust path as needed



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

        console.log(payload)

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined.");
            return res.status(500).send("Internal server error.");
        }
        
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Replace with your JWT secret key
            { expiresIn: '12h' }, // Token expiration time
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

        const tokenHeader = req.header('Authorization');
        // console.log(tokenHeader); // Check what you're receiving

        if (!tokenHeader) {
            return res.status(401).send('No token provided.');
        }

        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token || token === '') {
            return res.status(401).send('Token is malformed.');
        }

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

app.post('/api/notes', async (req, res) => {
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
        const note = new Note({
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
        // console.log(user.notes);

        // Send a response
        res.status(201).json({ msg: 'Note saved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    // console.log("id: " + id)

    try {
        const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });

        // console.log(note);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // This should contain the new note data

    try {
     const updatedNote = await Note.findByIdAndUpdate(
    id,
    updatedData,
    { new: true } // This option is used in Mongoose to return the modified document rather than the original
);


        if (!updatedNote) {
            return res.status(404).send('Note not found');
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error); // Always log the error
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

app.delete('/api/notes/:id', async (req, res) => {
    let { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Note deleted successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/star/:id', async (req, res) => {
    const { id } = req.params;

    console.log(req.header.Authorization)

    try {
        const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });

        //add the note to the user's starred notes array
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        const userId = decoded.user.id;
        // Check if the user already exists
        if(!decoded){
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Find the user
        const user = User.findOne({ userId });

        if (!user) { //this user is not the same as the user above
            return res.status(404).json({ msg: 'User not found' });
        }

        //add the note to the user's starred notes array
        user.starredNotes.push(note._id);

        // Save the user
        await user.save();

        if (!note) {
            return res.status(404).send('Note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
});

app.post('/api/folders', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user
        let user = await db.collection('users').findOne({ _id: new ObjectId(decoded.user.id) });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Extract folder details from request body
        const { title } = req.body;

        // Create a new folder
        const folder = {
            title,
            userId: user._id // Assuming you want to store the user's ObjectId
        };

        // Save the folder and get the result to obtain the inserted ID
        const result = await db.collection('folders').insertOne(folder);
        
        // Save the folder ID to the user's folders array
        await db.collection('users').updateOne(
            { _id: new ObjectId(user._id) },
            { $push: { folders: result.insertedId }}
        );

        // Send the folder id
        res.status(201).json({ msg: 'Folder saved successfully', folderId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.get('/api/folders/:id', async (req, res) => {
    try {
        const folderId = req.params.id;

        // Find the folder
        const folder = await db.collection('folders').findOne({ _id: new ObjectId(folderId) });
        if (!folder) {
            return res.status(404).json({ msg: 'Folder not found' });
        }

        // Count the notes in the folder
        const notesCount = await db.collection('notes').countDocuments({ folderId: new ObjectId(folderId) });

        // Send the folder details and notes count
        res.json({ ...folder, notesCount });
    } catch (error) {
        console.error(error);
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

