const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://127.0.0.1:27017/library_management')
  .then(async () => {
    console.log("Connected to DB");

    const books = await Book.find();

    for (const book of books) {
      // if old fields exist, copy to new ones
      if (book.title) book.name = book.title;
      if (book.isbn) book.serialNo = book.isbn;
      await book.save();
    }

    console.log("Books updated with name and serialNo");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
