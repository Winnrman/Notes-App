const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Free', 'Pro', 'Enterprise'],
        default: 'Free'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date,
    profilePictureURL: String,
    notes: [String], // Array of note IDs
    settings: {
        theme: String,
        emailNotifications: Boolean
    },
    isActive: {
        type: Boolean,
        default: true
    },
    starredNotes: [String], // Array of note IDs
    subscriptionEndDate: Date
});

// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
