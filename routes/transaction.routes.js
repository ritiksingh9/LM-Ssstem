const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const { isLoggedIn } = require('../middleware/auth');

// Base redirect
router.get('/', isLoggedIn, (req, res) => {
  res.redirect('/transactions/availability');
});

// Availability page
router.get('/availability', isLoggedIn, async (req, res) => {
  const books = await Book.find();
  res.render('transactions/availability', { books });
});

// Issue book
router.post('/issue', async (req, res) => {
  const issueDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(issueDate.getDate() + 15);

  await Transaction.create({
    bookId: req.body.bookId,
    issueDate,
    returnDate,
    fine: 0
  });

  await Book.findByIdAndUpdate(req.body.bookId, { status: 'Issued' });

  res.render('transactions/success'); // success message
});


//History issued books
// Issued Books History page
router.get('/history', isLoggedIn, async (req, res) => {
  const issuedTransactions = await Transaction.find()
    .populate('bookId'); // book details ke liye

  res.render('transactions/history', { issuedTransactions });
});

// Return book
router.get('/return', isLoggedIn, (req, res) => {
  res.render('transactions/return');
});

router.post('/return', async (req, res) => {
  const tx = await Transaction.findById(req.body.txId);
  const actual = new Date(req.body.actualReturnDate);

  let fine = 0;
  if (actual > tx.returnDate) {
    fine = Math.ceil((actual - tx.returnDate) / (1000 * 60 * 60 * 24)) * 10;
  }

  tx.actualReturnDate = actual;
  tx.fine = fine;
  await tx.save();

  res.render('transactions/fine', { fine });
});

// Confirm fine payment
router.post('/confirm-fine', async (req, res) => {
  // Yahan finePaid ko DB me track kar sakte ho agar chaho
  res.render('transactions/success'); // after fine paid
});

module.exports = router;
