const express = require('express');
const session = require('express-session');
const path = require('path');

require('./config/db'); // MongoDB connection

const app = express();

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'library-secret',
  resave: false,
  saveUninitialized: false
}));

// ===== VIEW ENGINE =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== STATIC FILES =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== CONTENT SECURITY POLICY (optional for dev) =====
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self'"
  );
  next();
});

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
  res.redirect('/login'); // home redirects to login
});

// ===== ROUTES =====
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const transactionRoutes = require('./routes/transaction.routes');
const reportRoutes = require('./routes/report.routes');

app.use('/user', userRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reports', reportRoutes);

// ===== SERVER =====
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
