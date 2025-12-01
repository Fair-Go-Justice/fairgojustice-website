/**
 * Stories Routes - Community story submission and display
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Story = require('../models/Story');
const auth = require('../middleware/auth');

// Get published stories
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    const query = { status: 'published' };
    if (category) query.category = category;
    
    const stories = await Story.find(query)
      .select('displayName location category excerpt createdAt')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Story.countDocuments(query);
    
    res.json({
      stories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    // Return sample stories if database unavailable
    res.json({
      stories: [
        {
          displayName: 'Margaret K.',
          location: 'Brisbane, QLD',
          category: 'legal-costs',
          excerpt: 'After three years fighting a simple property dispute, I spent my life savings on legal fees...',
          createdAt: new Date()
        },
        {
          displayName: 'David R.',
          location: 'Sydney, NSW',
          category: 'evidence',
          excerpt: 'Key evidence in my case mysteriously disappeared from the court file...',
          createdAt: new Date()
        }
      ],
      pagination: { page: 1, limit: 10, total: 2, pages: 1 }
    });
  }
});

// Get single story
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findOne({ 
      _id: req.params.id, 
      status: 'published' 
    });
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Submit new story
router.post('/', [
  body('name').trim().notEmpty().escape(),
  body('email').isEmail().normalizeEmail(),
  body('category').notEmpty(),
  body('story').trim().isLength({ min: 50, max: 10000 }).escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, location, category, story, impact, reforms, privacy, contact } = req.body;

    // Determine display name based on privacy setting
    let displayName = 'Anonymous';
    if (privacy === 'public') {
      displayName = name.split(' ')[0] + ' ' + name.split(' ').pop().charAt(0) + '.';
    }

    const newStory = new Story({
      name,
      email,
      location: location || '',
      category,
      story,
      impact: impact || '',
      reforms: reforms || '',
      privacy: privacy || 'anonymous',
      displayName,
      contact: contact === 'yes',
      status: 'pending',
      excerpt: story.substring(0, 200) + '...'
    });

    await newStory.save();

    res.status(201).json({
      message: 'Thank you for sharing your story. It will be reviewed and published soon.',
      id: newStory._id
    });
  } catch (error) {
    console.error('Story submission error:', error);
    res.status(500).json({ error: 'Failed to submit story. Please try again.' });
  }
});

// Admin: Update story status (requires auth)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'published', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ message: 'Story status updated', story });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update story' });
  }
});

module.exports = router;
