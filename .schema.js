const mongoose = require('mongoose');

// Define Comment schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  commentedAt: {
    type: Date,
    default: Date.now
  }
});

// Define BlogPost schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 5
  },
  content: {
    type: String,
    required: true,
    minlength: 50
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: 'General'
  },
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  comments: [commentSchema] // Embed comments as subdocuments
});

// Middleware to update the `updatedAt` field before saving
blogPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create models
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { BlogPost, Comment };
