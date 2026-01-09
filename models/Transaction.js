const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  issueDate: Date,
  returnDate: Date,
  actualReturnDate: Date,
  fine: Number
});

module.exports = mongoose.model('Transaction', transactionSchema);
