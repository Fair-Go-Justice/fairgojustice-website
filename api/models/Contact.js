/**
 * Contact Model - Contact form submissions
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: [
      'general',
      'petition',
      'story',
      'media',
      'volunteer',
      'partnership',
      'other'
    ]
  },
  message: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 5000
  },
  subscribe: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  notes: {
    type: String
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
