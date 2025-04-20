const express = require('express');
const router = express.Router();
const {
  createOrUpdateUser,
  getUserByFirebaseUid,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Create or update user after signup
router.post('/signup', createOrUpdateUser);

// Get user profile by ID (MongoDB _id)
router.get('/id/:id', getUserById);

// Get user profile by Firebase UID
router.get('/firebase/:firebaseUid', getUserByFirebaseUid);

// Update user profile
router.put('/firebase/:firebaseUid', updateUser);

// Delete user
router.delete('/firebase/:firebaseUid', deleteUser);

module.exports = router; 