/**
 * Petition Model - Petition signatures
 */

const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
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
  postcode: {
    type: String,
    required: true,
    match: /^\d{4}$/
  },
  location: {
    type: String,
    default: 'Australia'
  },
  comment: {
    type: String,
    trim: true,
    maxLength: 1000
  },
  displayName: {
    type: Boolean,
    default: true
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
petitionSchema.index({ email: 1 });
petitionSchema.index({ createdAt: -1 });
petitionSchema.index({ location: 1 });

module.exports = mongoose.model('Petition', petitionSchema);
