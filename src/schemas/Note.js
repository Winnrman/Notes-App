const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FreeNote Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateLastModified: Date,
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }
});

// Create a model
const Note = mongoose.model('Note', noteSchema);

// Export the model
module.exports = Note;


