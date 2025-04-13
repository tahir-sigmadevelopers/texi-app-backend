const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['sedan', 'suv', 'hatchback', 'minivan', 'crossover', 'convertible', 'coupe', 'wagon']
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng', 'lpg']
  },
  features: [{
    type: String,
    enum: [
      'air_conditioning', 'power_steering', 'airbags', 'sunroof', 'bluetooth',
      'backup_camera', 'navigation_system', 'leather_seats', 'heated_seats',
      'keyless_entry', 'cruise_control', 'alloy_wheels', 'parking_sensors',
      'auto_climate', 'premium_audio'
    ]
  }],
  images: [{
    type: String // URLs to images
  }],
  documents: [{
    type: String // URLs to documents
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
carSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Car', carSchema); 