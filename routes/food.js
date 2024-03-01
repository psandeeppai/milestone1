const express = require('express');
const router = express.Router();
const Food = require('../routes/food');

// Get all food items
router.get('/food', (req, res) => {
  Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add a new food item
router.post('/food', (req, res) => {
  const newFood = new Food(req.body);
  newFood.save()
    .then(food => res.json(food))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Other CRUD routes for food items can be added as needed

module.exports = router;