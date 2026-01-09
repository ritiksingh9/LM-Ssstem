const mongoose = require('mongoose');
const Book = require('./models/Book'); // path to your Book.js

mongoose.connect('mongodb://127.0.0.1:27017/library_management')
  .then(async () => {
    console.log("Connected to MongoDB");

    // Fetch all books with old fields
    const booksWithTitle = await Book.find({ title: { $exists: true } });
    for (const book of booksWithTitle) {
      book.name = book.title;
      book.title = undefined;
      await book.save();
    }

    const booksWithIsbn = await Book.find({ isbn: { $exists: true } });
    for (const book of booksWithIsbn) {
      book.serialNo = book.isbn;
      book.isbn = undefined;
      await book.save();
    }

    console.log("All books updated with 'name' and 'serialNo'!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
