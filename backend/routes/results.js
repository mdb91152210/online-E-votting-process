const express = require('express');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');
const User = require('../models/User');
const ElectionSettings = require('../models/ElectionSettings');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Helper function to get results
const getResultsData = async () => {
  const settings = await ElectionSettings.getSettings();
  
  if (!settings.resultsPublished) {
    return {
      results: [],
      statistics: null,
      published: false,
      message: 'Results are not published yet. Please wait for the admin to publish the results.'
    };
  }

  const candidates = await Candidate.find({ isActive: true })
    .sort({ voteCount: -1 });

  const totalVotes = await Vote.countDocuments();
  const totalUsers = await User.countDocuments({ role: 'user' });

  const results = candidates.map(candidate => ({
    id: candidate._id,
    name: candidate.name,
    party: candidate.party,
    description: candidate.description,
    image: candidate.image,
    voteCount: candidate.voteCount,
    percentage: totalVotes > 0 ? ((candidate.voteCount / totalVotes) * 100).toFixed(2) : 0
  }));

  return {
    results,
    statistics: {
      totalVotes,
      totalUsers,
      votingPercentage: totalUsers > 0 ? ((totalVotes / totalUsers) * 100).toFixed(2) : 0
    },
    published: true
  };
};

// @route   GET /api/results/public
// @desc    Get voting results (public - no auth required, only if published)
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const data = await getResultsData();
    res.json({
      success: true,
      ...data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/results
// @desc    Get voting results (only if published)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const data = await getResultsData();
    res.json({
      success: true,
      ...data
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


