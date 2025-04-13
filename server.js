const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

// Function to get the local IP address
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // Default to localhost if no other IP found
};

const app = express();
const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.IP_ADDRESS || getLocalIpAddress();

// Middleware
// app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const driverRoutes = require('./routes/driverRoutes');
const carRoutes = require('./routes/carRoutes');

app.use('/api/drivers', driverRoutes);
app.use('/api/cars', carRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Driver API is running');
});

// Start server
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server running on port ${PORT} at http://${IP_ADDRESS}:${PORT}`);
}); 


