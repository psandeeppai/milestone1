const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config');

// OAuth2 authentication route for Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// OAuth2 callback route for Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, config.jwtSecret);
    res.redirect(`/dashboard?token=${token}`);
  }
);

// Local authentication route
router.post('/auth/local', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
          }
          const token = jwt.sign({ id: user.id }, config.jwtSecret);
          res.json({ token });
        });
    });
});

module.exports = router;