const express = require('express');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/results
// @desc    Get voting results
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const candidates = await Candidate.find({ isActive: true })
      .sort({ voteCount: -1 });

    const totalVotes = await Vote.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Calculate percentages
    const results = candidates.map(candidate => ({
      id: candidate._id,
      name: candidate.name,
      party: candidate.party,
      description: candidate.description,
      image: candidate.image,
      voteCount: candidate.voteCount,
      percentage: totalVotes > 0 ? ((candidate.voteCount / totalVotes) * 100).toFixed(2) : 0
    }));

    res.json({
      success: true,
      results,
      statistics: {
        totalVotes,
        totalUsers,
        votingPercentage: totalUsers > 0 ? ((totalVotes / totalUsers) * 100).toFixed(2) : 0
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

module.exports = router;


