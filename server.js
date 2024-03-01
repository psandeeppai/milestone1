const express = require('express');
const mongoose = require('mongoose');
//const passport = require('passport');
const config = require('./config');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Passport middleware
app.use(passport.initialize());

// Passport config
//require()(passport);

// Routes
app.use('/', authRoutes);
app.use('/', foodRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));