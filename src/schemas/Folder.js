const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Folder Schema
const folderSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    notes: [String], // Array of note IDs
});

// Create a model
const Folder = mongoose.model('Folder', folderSchema); //this will create a collection called 'folders' in the database

// Export the model
module.exports = Folder;