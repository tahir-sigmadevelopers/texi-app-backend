const Car = require('../models/Car');

// Add a new car
exports.addCar = async (req, res) => {
    try {
        const { name, type, number, fuelType, features, images, documents } = req.body;
        console.log('adding car');
        // Validate required fields
        if (!name || !type || !number || !fuelType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, type, number, and fuelType'
            });
        }

        console.log('validating fields');

        // Check if car number already exists
        const existingCar = await Car.findOne({ number });
        if (existingCar) {
            return res.status(400).json({
                success: false,
                message: 'A car with this number already exists'
            });
        }

        console.log('creating new car');
        // Create new car
        const newCar = new Car({
            name,
            type,
            number,
            fuelType,
            features: features || [],
            images: images || [],
            documents: documents || []
        });

        await newCar.save();

        res.status(201).json({
            success: true,
            message: 'Car added successfully',
            data: newCar
        });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding car',
            error: error.message
        });
    }
}; 