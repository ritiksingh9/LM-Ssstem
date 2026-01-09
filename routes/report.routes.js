const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Membership = require('../models/Membership');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

router.get('/', isLoggedIn, isAdmin, (req, res) => {
  res.render('reports/home');
});

router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.render('reports/books', { books });
});

router.get('/memberships', async (req, res) => {
  const memberships = await Membership.find();
  res.render('reports/membership', { memberships });
});

module.exports = router;
