const express = require('express');
const { body, validationResult } = require('express-validator');
const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/votes
// @desc    Cast a vote
// @access  Private
router.post('/', [
  protect,
  body('candidateId').notEmpty().withMessage('Candidate ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Check if user has already voted
    if (req.user.hasVoted) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted'
      });
    }

    const { candidateId } = req.body;

    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate || !candidate.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found or inactive'
      });
    }

    // Check if vote already exists (double check)
    const existingVote = await Vote.findOne({ user: req.user._id });
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted'
      });
    }

    // Create vote
    const vote = await Vote.create({
      user: req.user._id,
      candidate: candidateId,
      ipAddress: req.ip || req.connection.remoteAddress
    });

    // Update candidate vote count
    candidate.voteCount += 1;
    await candidate.save();

    // Update user hasVoted status
    req.user.hasVoted = true;
    await req.user.save();

    res.status(201).json({
      success: true,
      message: 'Vote cast successfully',
      vote: {
        id: vote._id,
        candidate: candidate.name,
        votedAt: vote.votedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/votes/candidates
// @desc    Get all active candidates
// @access  Private
router.get('/candidates', protect, async (req, res) => {
  try {
    const candidates = await Candidate.find({ isActive: true })
      .select('-voteCount')
      .sort({ name: 1 });

    res.json({
      success: true,
      candidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;


