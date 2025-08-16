const mongoose = require('mongoose');

const bloodCampSchema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: [true, 'Organizer name is required.'],
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'A contact phone number is required.'],
  },
  address: {
    type: String,
    required: [true, 'A detailed address or place name is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is a required field.'],
    trim: true,
    index: true // Index this field for faster searching by city
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'The date of the camp is required.'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required.'],
  },
  endTime: {
    type: String,
    required: [true, 'End time is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// To prevent duplicate camps (same organizer, date, and city)
bloodCampSchema.index({ organizerName: 1, date: 1, city: 1 }, { unique: true });

const BloodCamp = mongoose.model('BloodCamp', bloodCampSchema);

module.exports = BloodCamp;