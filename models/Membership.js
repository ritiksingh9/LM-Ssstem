const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  memberName: String,
  startDate: Date,
  endDate: Date,
  status: String
});

module.exports = mongoose.model('Membership', membershipSchema);
