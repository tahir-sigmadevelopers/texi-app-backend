const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Add a new car
router.post('/add', carController.addCar);

// Get all cars
router.get('/', carController.getAllCars);

// Delete a car
router.delete('/:id', carController.deleteCar);

module.exports = router; 