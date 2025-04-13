# Driver Management API

A RESTful API for managing driver data built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for driver data
- Input validation
- Error handling
- MongoDB integration

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/driver-db
   ```
   - Adjust the MONGO_URI to your MongoDB connection string

## Usage

### Start development server:
```
npm run dev
```

### Start production server:
```
npm start
```

## API Endpoints

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | /api/drivers    | Get all drivers     |
| POST   | /api/drivers    | Create a new driver |
| GET    | /api/drivers/:id| Get driver by id    |
| PUT    | /api/drivers/:id| Update driver       |
| DELETE | /api/drivers/:id| Delete driver       |

## Driver Model

```javascript
{
  name: String,
  licenseNumber: String,
  vehicleType: String, // Car, Truck, Motorcycle, Bus, Van
  experience: Number,
  contactNumber: String,
  email: String,
  address: String,
  status: String, // Active, Inactive, Suspended
  createdAt: Date
}
``` 