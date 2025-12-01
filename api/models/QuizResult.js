/**
 * QuizResult Model - Quiz completion tracking
 */

const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  answers: [{
    question: String,
    selected: Number,
    correct: Boolean,
    explanation: String
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for analytics
quizResultSchema.index({ createdAt: -1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
