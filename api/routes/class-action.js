/**
 * Class Action Routes - Registration for class action participation
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ClassActionRegistration = require('../models/ClassActionRegistration');

// Register interest in class action
router.post('/register', [
  body('firstName').trim().notEmpty().escape(),
  body('lastName').trim().notEmpty().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').trim().notEmpty().escape(),
  body('postcode').matches(/^\d{4}$/),
  body('experienceDetails').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, postcode, experienceDetails, displayName, subscribe } = req.body;

    // Check for duplicate
    const existing = await ClassActionRegistration.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'You have already registered your interest' });
    }

    // Create registration
    const registration = new ClassActionRegistration({
      firstName,
      lastName,
      email,
      phone,
      postcode,
      experienceDetails: experienceDetails || '',
      displayName: displayName !== false,
      subscribe: subscribe !== false,
      location: postcodeToLocation(postcode),
      ipAddress: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
    });

    await registration.save();

    res.status(201).json({
      message: 'Thank you for registering your interest. We will keep you updated on developments.'
    });
  } catch (error) {
    console.error('Class action registration error:', error);
    res.status(500).json({ error: 'Failed to register your interest. Please try again.' });
  }
});

// Helper: Convert postcode to general location (same as petition)
function postcodeToLocation(postcode) {
  const code = parseInt(postcode, 10);

  // NSW/ACT ranges
  if (code >= 2000 && code <= 2599) return 'NSW';
  if (code >= 2600 && code <= 2618) return 'ACT';
  if (code >= 2619 && code <= 2898) return 'NSW';
  if (code >= 2899 && code <= 2920) return 'ACT';
  if (code >= 2921 && code <= 2999) return 'NSW';

  // VIC ranges
  if (code >= 3000 && code <= 3999) return 'VIC';
  if (code >= 8000 && code <= 8999) return 'VIC';

  // QLD ranges
  if (code >= 4000 && code <= 4999) return 'QLD';
  if (code >= 9000 && code <= 9999) return 'QLD';

  // SA ranges
  if (code >= 5000 && code <= 5799) return 'SA';
  if (code >= 5800 && code <= 5999) return 'SA';

  // WA ranges
  if (code >= 6000 && code <= 6797) return 'WA';
  if (code >= 6800 && code <= 6999) return 'WA';

  // TAS ranges
  if (code >= 7000 && code <= 7799) return 'TAS';
  if (code >= 7800 && code <= 7999) return 'TAS';

  // NT ranges
  if (code >= 800 && code <= 899) return 'NT';

  return 'Australia';
}

module.exports = router;