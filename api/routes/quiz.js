/**
 * Quiz Routes - Interactive quiz questions and results
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const QuizResult = require('../models/QuizResult');

// Default quiz questions
const defaultQuestions = [
  {
    id: 1,
    question: "What percentage of Australians cannot afford legal representation?",
    options: [
      { text: "About 10%", value: 0 },
      { text: "About 25%", value: 0 },
      { text: "About 40%", value: 1 },
      { text: "About 60%", value: 0 }
    ],
    explanation: "Research shows approximately 40% of Australians cannot afford basic legal representation."
  },
  {
    id: 2,
    question: "How much is the average retainer required by lawyers in Australia?",
    options: [
      { text: "$5,000 - $10,000", value: 0 },
      { text: "$15,000 - $25,000", value: 0 },
      { text: "$30,000 - $50,000", value: 1 },
      { text: "Over $50,000", value: 0 }
    ],
    explanation: "Many lawyers require retainers of $30,000-$50,000, putting justice out of reach for average Australians."
  },
  {
    id: 3,
    question: "What is a National Judicial Integrity Commission?",
    options: [
      { text: "A court for minor offenses", value: 0 },
      { text: "An independent body to oversee judicial conduct", value: 1 },
      { text: "A legal aid organization", value: 0 },
      { text: "A training academy for judges", value: 0 }
    ],
    explanation: "A National Judicial Integrity Commission is an independent body that investigates complaints against judges."
  },
  {
    id: 4,
    question: "How many signatures are typically needed to trigger a Royal Commission inquiry?",
    options: [
      { text: "10,000", value: 0 },
      { text: "50,000", value: 0 },
      { text: "100,000", value: 1 },
      { text: "500,000", value: 0 }
    ],
    explanation: "While not a legal requirement, 100,000 signatures demonstrates significant public support for a Royal Commission."
  },
  {
    id: 5,
    question: "What is the 'Fair Go' principle in Australian culture?",
    options: [
      { text: "A sports betting term", value: 0 },
      { text: "Everyone deserves equal opportunity and treatment", value: 1 },
      { text: "A government welfare program", value: 0 },
      { text: "A legal defense strategy", value: 0 }
    ],
    explanation: "The 'Fair Go' is a core Australian value meaning everyone deserves equal opportunity and fair treatment."
  }
];

// Get quiz questions
router.get('/questions', (req, res) => {
  // Remove correct answers from response for security
  const questions = defaultQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options.map((opt, index) => ({
      index,
      text: opt.text
    }))
  }));
  
  res.json(questions);
});

// Submit quiz results
router.post('/submit', [
  body('answers').isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { answers, email } = req.body;
    
    // Calculate score
    let score = 0;
    const results = answers.map((answer, index) => {
      const question = defaultQuestions[index];
      if (question && question.options[answer]) {
        const isCorrect = question.options[answer].value === 1;
        if (isCorrect) score++;
        return {
          question: question.question,
          selected: answer,
          correct: isCorrect,
          explanation: question.explanation
        };
      }
      return null;
    }).filter(Boolean);

    const percentage = Math.round((score / defaultQuestions.length) * 100);

    // Save result if email provided
    if (email) {
      const quizResult = new QuizResult({
        email,
        score,
        percentage,
        answers: results
      });
      await quizResult.save();
    }

    res.json({
      score,
      total: defaultQuestions.length,
      percentage,
      results,
      message: getResultMessage(percentage)
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ error: 'Failed to process quiz results' });
  }
});

// Get result message based on score
function getResultMessage(percentage) {
  if (percentage >= 80) {
    return {
      title: "Excellent!",
      message: "You understand Australia's justice system well.",
      recommendation: "Share your knowledge and help others understand the need for reform."
    };
  } else if (percentage >= 60) {
    return {
      title: "Good effort!",
      message: "You have a solid understanding of the issues.",
      recommendation: "Explore our resources to learn more about justice reform."
    };
  } else if (percentage >= 40) {
    return {
      title: "There's more to learn!",
      message: "Our justice system has many hidden problems.",
      recommendation: "Check out our pillars page to understand why reform is crucial."
    };
  } else {
    return {
      title: "Time to discover the truth!",
      message: "Many Australians don't know how broken our system really is.",
      recommendation: "Read our stories and resources to see why change is needed."
    };
  }
}

module.exports = router;
