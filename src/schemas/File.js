const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  // You can add additional fields as needed
  // For example, a reference to a user who uploaded the file
  // user: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User' 
  // }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
