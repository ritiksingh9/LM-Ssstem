const mongoose = require('./config/db');
const User = require('./models/User');
const Book = require('./models/Book');
const Membership = require('./models/Membership');

async function seedData() {
  try {
    // Clear old data
    await User.deleteMany();
    await Book.deleteMany();
    await Membership.deleteMany();

    // USERS
    await User.insertMany([
      {
        username: 'admin',
        password: 'admin',
        role: 'admin',
        isActive: true
      },
      {
        username: 'user',
        password: 'user',
        role: 'user',
        isActive: true
      }
    ]);

    // BOOKS (15 DATA)
    await Book.insertMany([
      { title: 'Physics', author: 'HC Verma', status: 'Available' },
      { title: 'Chemistry', author: 'OP Tandon', status: 'Available' },
      { title: 'Mathematics', author: 'RD Sharma', status: 'Available' },
      { title: 'Biology', author: 'NCERT', status: 'Available' },
      { title: 'Economics', author: 'Adam Smith', status: 'Available' },
      { title: 'Indian Polity', author: 'M Laxmikanth', status: 'Available' },
      { title: 'Geography', author: 'GC Leong', status: 'Available' },
      { title: 'History of India', author: 'Bipin Chandra', status: 'Available' },
      { title: 'Fiction Story', author: 'Ruskin Bond', status: 'Available' },
      { title: 'The Alchemist', author: 'Paulo Coelho', status: 'Available' },
      { title: 'Atomic Habits', author: 'James Clear', status: 'Available' },
      { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', status: 'Available' },
      { title: 'Think and Grow Rich', author: 'Napoleon Hill', status: 'Available' },
      { title: 'Children Tales', author: 'Unknown', status: 'Available' },
      { title: 'Self Help', author: 'Robin Sharma', status: 'Available' }
    ]);

    // MEMBERSHIPS
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 6);

    await Membership.insertMany([
      {
        memberName: 'Rahul Kumar',
        startDate: start,
        endDate: end,
        status: 'Active'
      },
      {
        memberName: 'Amit Singh',
        startDate: start,
        endDate: end,
        status: 'Active'
      },
      {
        memberName: 'Neha Sharma',
        startDate: start,
        endDate: end,
        status: 'Active'
      }
    ]);

    console.log('✅ Seed data (15 books) inserted successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();
