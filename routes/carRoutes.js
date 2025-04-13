const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Add a new car
router.post('/add', carController.addCar);

module.exports = router; 