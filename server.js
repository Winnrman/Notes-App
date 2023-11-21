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

        // console.log(payload)

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

        // console.log(req.header)

        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token || token === '') {
            return res.status(401).send('No token provided.');
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

app.post('/api/folders', async (req, res) => {
    try {
        const token = req.headers('Authorization').replace('Bearer ', '');
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

        // console.log(folderId)

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

app.delete('/api/folders/:id', async (req, res) => {
    try {
        const folderId = req.params.id;

        // Delete the folder
        await db.collection('folders').deleteOne({ _id: new ObjectId(folderId) });

        // Delete the folder ID from the user's folders array
        await db.collection('users').updateOne(
            { folders: new ObjectId(folderId) },
            { $pull: { folders: new ObjectId(folderId) }}
        );

        // Delete the folder ID from the notes in the folder
        await db.collection('notes').updateMany(
            { folderId: new ObjectId(folderId) },
            { $unset: { folderId: '' }}
        );

        res.status(200).json({ msg: 'Folder deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/api/notes/:id/star', async (req, res) => {
    try {

        const { id } = req.params;
        const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });
        if (!note) {
            return res.status(404).send('Note not found');
        }

        console.log(req.headers)

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { starredNotes: note._id } }
        );

        //also change the note's isStarred property to true
        // await db.collection('notes').updateOne(
        //     { _id: new ObjectId(id) },
        //     { $set: { isStarred: true } }
        // );

        res.status(200).json({ msg: 'Note starred successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/api/users/:userId/starredNotes', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const notes = await Promise.all(
            user.starredNotes.map(async (noteId) => {
                return await db.collection('notes').findOne({ _id: new ObjectId(noteId) });
            })
        );

        // console.log(notes);
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const Grid = require('gridfs-stream');

// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGODB_URI);

// Init gfs
let gfs, gridfsBucket;

conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
     });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    try {

        // console.log(req.file)

        
      // The file has been stored by Multer at this point, and you can access it via req.file
      // You might want to store file information in your document database model
      // or perform other operations before sending the response.
  
      // For example, let's assume we want to store the file's metadata in a document:
      const fileMetadata = {
        filename: req.file.filename,
        contentType: req.file.contentType,
        // Add any other metadata you want to store, like user ID, etc.
      };
  
      // You can save the metadata to your MongoDB collection if needed
      // For example:
      // const FileModel = mongoose.model('File', new mongoose.Schema({ ... }));
      // const fileDocument = new FileModel(fileMetadata);
      // await fileDocument.save();
  
      // Respond with the URL or ID of the image
      // Here we are just sending back the file ID generated by GridFS
      res.status(201).json({ imageUrl: `/api/images/${req.file.filename}` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading file.');
    }
  });

  
  app.get('/api/images/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gridfsBucket.openDownloadStream(file._id); //holy shit it works
            readstream.pipe(res);
        }
        else if(file.contentType === 'image/webp'){
            const readstream = gridfsBucket.openDownloadStream(file._id);
            readstream.pipe(res);
        }
        else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
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

