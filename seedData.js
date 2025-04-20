const mongoose = require('mongoose');
const Driver = require('./models/driverModel');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample driver data
const driverData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  gender: 'Male',
  city: 'New York',
  image: 'https://randomuser.me/api/portraits/men/1.jpg'
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Driver.deleteMany();
    
    // Create new driver
    await Driver.create(driverData);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 