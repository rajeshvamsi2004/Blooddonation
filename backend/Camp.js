const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the Mongoose Model
const BloodCamp = require('./models/Bloodcamp');

// --- INITIALIZATION ---
const app = express();
const PORT = process.env.CAMP_PORT || 7000; // Use a unique port from .env
const MONGODB_URI = process.env.MONGODB_URI;

// --- MIDDLEWARE ---
app.use(cors()); // Allow requests from other origins (like your frontend)
app.use(express.json()); // Allow the server to accept JSON in request bodies

// --- DATABASE CONNECTION ---
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Camp Service connected to MongoDB.`);
}).catch(err => {
  console.error('Database connection failed:', err.message);
  process.exit(1); // Exit if we can't connect to the database
});


// --- ROUTES ---

// Route 1: (Manager) Upload/Create a new blood camp
app.post('/api/camps', async (req, res) => {
  try {
    const newCamp = new BloodCamp({
      organizerName: req.body.organizerName,
      contactPhone: req.body.contactPhone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    const savedCamp = await newCamp.save();
    res.status(201).json({ message: 'Camp created successfully!', data: savedCamp });

  } catch (error) {
    // Check for the duplicate key error code (11000)
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This camp already exists for this organizer, date, and city.' });
    }
    console.error('Error creating camp:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
});


// Route 2: (User) View upcoming blood camps
// Can be filtered by city: GET /api/camps?city=Chennai
app.get('/api/camps', async (req, res) => {
  try {
    const { city } = req.query; // Get the city from the URL query string

    // Build the query object. It will always filter for future dates.
    const query = {
      // Get camps from the beginning of today onwards
      date: { $gte: new Date().setHours(0, 0, 0, 0) }
    };

    // If a city was provided in the URL, add it to the query
    if (city) {
      // Use a case-insensitive regular expression to match the city name
      query.city = new RegExp(city, 'i');
    }

    // Find all camps that match the query and sort them by date (soonest first)
    const camps = await BloodCamp.find(query).sort({ date: 'asc' });

    if (camps.length === 0) {
      return res.status(404).json({ message: 'No upcoming blood camps were found.' });
    }

    res.status(200).json(camps);

  } catch (error) {
    console.error('Error fetching camps:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
});


// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`🩸 Blood Camp Service is running on separate port: ${PORT}`);
});