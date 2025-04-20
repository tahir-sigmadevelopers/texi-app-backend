const express = require('express');
const router = express.Router();
const {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  getCurrentProfile,
  updateCurrentProfile
} = require('../controllers/driverController');

// Routes
router
  .route('/')
  .get(getAllDrivers)
  .post(createDriver);

  // Profile routes
router
.route('/profile')
.get(getCurrentProfile)
.put(updateCurrentProfile);

router
  .route('/:id')
  .get(getDriverById)
  .put(updateDriver)
  .delete(deleteDriver);


module.exports = router; 