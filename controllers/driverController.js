const Driver = require('../models/driverModel');

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    console.log('getAllDrivers');
    const drivers = await Driver.find();
    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single driver
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new driver
exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    
    res.status(201).json({
      success: true,
      data: driver
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Driver not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get current driver profile
// For now, we'll use a mock current user ID until authentication is implemented
exports.getCurrentProfile = async (req, res) => {
  try {
    // This would normally be retrieved from authentication
    // For now, we'll use the first driver in the database as mock
    console.log('Getting current user profile');
    
    // Find the first driver (for demo purposes)
    const driver = await Driver.findOne();
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update current driver profile
exports.updateCurrentProfile = async (req, res) => {
  try {
    // This would normally be retrieved from authentication
    // For now, we'll use the first driver in the database as mock
    console.log('Updating current user profile');
    
    // Find the first driver (for demo purposes)
    const driver = await Driver.findOne();
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Update the driver fields
    const { name, email, phoneNumber, city } = req.body;
    
    if (name) driver.name = name;
    if (email) driver.email = email;
    if (phoneNumber) driver.phoneNumber = phoneNumber;
    if (city) driver.city = city;
    
    await driver.save();
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}; 