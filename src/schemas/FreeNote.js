const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FreeNote Schema
const freeNoteSchema = new Schema({
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
const FreeNote = mongoose.model('FreeNote', freeNoteSchema);

// Export the model
module.exports = FreeNote;


