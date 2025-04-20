const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true,  // This allows the field to be optional but unique when present
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    trim: true
  },
  homeAddress: {
    type: String,
    trim: true
  },
  workAddress: {
    type: String,
    trim: true
  },
  favoriteLocations: [{
    name: String,
    address: String,
    lat: Number,
    lng: Number
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
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema); 