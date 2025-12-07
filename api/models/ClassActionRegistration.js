/**
 * Class Action Registration Model - Registrations for class action participation
 */

const mongoose = require('mongoose');

const classActionRegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  postcode: {
    type: String,
    required: true,
    match: /^\d{4}$/
  },
  location: {
    type: String,
    default: 'Australia'
  },
  experienceDetails: {
    type: String,
    trim: true,
    maxLength: 2000
  },
  displayName: {
    type: Boolean,
    default: false // For class action, keep private by default
  },
  subscribe: {
    type: Boolean,
    default: true
  },
  ipAddress: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
classActionRegistrationSchema.index({ email: 1 });
classActionRegistrationSchema.index({ createdAt: -1 });
classActionRegistrationSchema.index({ location: 1 });

module.exports = mongoose.model('ClassActionRegistration', classActionRegistrationSchema);