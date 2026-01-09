const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Membership = require('../models/Membership');
const User = require('../models/User');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

router.get('/dashboard', isLoggedIn, isAdmin, (req, res) => {
  res.render('admin/dashboard');
});

/* BOOK */
router.get('/add-book', isLoggedIn, isAdmin, (req, res) => {
  res.render('admin/addBook');
});

router.post('/add-book', async (req, res) => {
  await Book.create(req.body);
  res.redirect('/admin/dashboard');
});

/* MEMBERSHIP */
router.get('/add-membership', isLoggedIn, isAdmin, (req, res) => {
  res.render('admin/addMembership');
});

router.post('/add-membership', async (req, res) => {
  const start = new Date(req.body.startDate);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 6);

  await Membership.create({
    memberName: req.body.memberName,
    startDate: start,
    endDate: end,
    status: 'Active'
  });

  res.redirect('/admin/dashboard');
});

/* USERS */
router.get('/users', isLoggedIn, isAdmin, async (req, res) => {
  const users = await User.find();
  res.render('admin/users', { users });
});

router.post('/toggle-user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.redirect('/admin/users');
});

module.exports = router;
