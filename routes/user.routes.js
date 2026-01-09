const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Membership = require('../models/Membership');
const { isLoggedIn } = require('../middleware/auth');

/* USER DASHBOARD */
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('user/dashboard');
});

/* USER REPORTS */
router.get('/reports', isLoggedIn, async (req, res) => {
  const transactions = await Transaction.find({
    userId: req.session.userId
  }).populate('bookId');

  const membership = await Membership.findOne({
    userId: req.session.userId
  });

  res.render('user/reports', { transactions, membership });
});

module.exports = router;
