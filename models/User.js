const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
