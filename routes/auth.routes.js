const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user || !user.isActive) {
    return res.send('Invalid credentials');
  }

  req.session.user = user;

  user.role === 'admin'
    ? res.redirect('/admin/dashboard')
    : res.redirect('/user/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
