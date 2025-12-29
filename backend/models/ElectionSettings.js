const mongoose = require('mongoose');

const electionSettingsSchema = new mongoose.Schema({
  resultsPublished: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Only allow one document
  collection: 'electionsettings'
});

// Ensure only one document exists
electionSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({ resultsPublished: false });
  }
  return settings;
};

module.exports = mongoose.model('ElectionSettings', electionSettingsSchema);

