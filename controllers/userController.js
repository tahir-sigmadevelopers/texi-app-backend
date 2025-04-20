const User = require('../models/userModel');

// Create or update user after Firebase authentication
exports.createOrUpdateUser = async (req, res) => {
    try {
        const { firebaseUid, name, email, phoneNumber, profileImage, homeAddress, workAddress, favoriteLocations } = req.body;

        console.log('firebaseUid', firebaseUid);
        console.log('name', name);
        console.log('email', email);
        console.log('phoneNumber', phoneNumber);
        console.log('profileImage', profileImage);
        console.log('homeAddress', homeAddress);
        console.log('workAddress', workAddress);
        // If firebaseUid is provided, check if user exists
        if (firebaseUid) {
            let user = await User.findOne({ firebaseUid });

            if (user) {
                // Update existing user
                if (name) user.name = name;
                if (email) user.email = email;
                if (phoneNumber) user.phoneNumber = phoneNumber;
                if (profileImage) user.profileImage = profileImage;
                if (homeAddress) user.homeAddress = homeAddress;
                if (workAddress) user.workAddress = workAddress;
                if (favoriteLocations) user.favoriteLocations = favoriteLocations;

                await user.save();

                return res.status(200).json({
                    success: true,
                    message: 'User updated successfully',
                    data: user
                });
            }
        }

        // If user not found or firebaseUid not provided, create new user
        const userData = {
            name,
            email,
            phoneNumber,
            profileImage
        };

        // Add optional fields if they exist
        if (firebaseUid) userData.firebaseUid = firebaseUid;
        if (homeAddress) userData.homeAddress = homeAddress;
        if (workAddress) userData.workAddress = workAddress;
        if (favoriteLocations) userData.favoriteLocations = favoriteLocations;

        const newUser = new User(userData);
        await newUser.save();
        console.log('newUser', newUser);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Error creating/updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating/updating user',
            error: error.message
        });
    }
};

// Get user profile by Firebase UID
exports.getUserByFirebaseUid = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        if (!firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Firebase UID parameter is required'
            });
        }

        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting user',
            error: error.message
        });
    }
};

// Get user profile by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting user',
            error: error.message
        });
    }
};

// Update user profile
exports.updateUser = async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const { name, email, phoneNumber, profileImage, homeAddress, workAddress, favoriteLocations } = req.body;

        if (!firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Firebase UID parameter is required'
            });
        }

        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (profileImage) user.profileImage = profileImage;
        if (homeAddress) user.homeAddress = homeAddress;
        if (workAddress) user.workAddress = workAddress;
        if (favoriteLocations) user.favoriteLocations = favoriteLocations;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        if (!firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Firebase UID parameter is required'
            });
        }

        const user = await User.findOneAndDelete({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
}; 