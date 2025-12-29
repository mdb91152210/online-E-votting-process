const express = require('express');
const { body, validationResult } = require('express-validator');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');
const User = require('../models/User');
const ElectionSettings = require('../models/ElectionSettings');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVotes = await Vote.countDocuments();
    const totalCandidates = await Candidate.countDocuments();
    const activeCandidates = await Candidate.countDocuments({ isActive: true });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalVotes,
        totalCandidates,
        activeCandidates,
        votingPercentage: totalUsers > 0 ? ((totalVotes / totalUsers) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/candidates
// @desc    Create a new candidate
// @access  Private/Admin
router.post('/candidates', [
  body('name').trim().notEmpty().withMessage('Candidate name is required'),
  body('party').trim().notEmpty().withMessage('Party name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/admin/candidates
// @desc    Get all candidates (including vote counts)
// @access  Private/Admin
router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });

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

// @route   PUT /api/admin/candidates/:id
// @desc    Update a candidate
// @access  Private/Admin
router.put('/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/admin/candidates/:id
// @desc    Delete a candidate
// @access  Private/Admin
router.delete('/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/results-status
// @desc    Get results published status
// @access  Private/Admin
router.get('/results-status', async (req, res) => {
  try {
    const settings = await ElectionSettings.getSettings();
    res.json({
      success: true,
      resultsPublished: settings.resultsPublished
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/results-publish
// @desc    Publish or unpublish results
// @access  Private/Admin
router.put('/results-publish', async (req, res) => {
  try {
    const { published } = req.body;
    const settings = await ElectionSettings.getSettings();
    settings.resultsPublished = published === true;
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({
      success: true,
      message: published ? 'Results published successfully' : 'Results unpublished successfully',
      resultsPublished: settings.resultsPublished
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;


