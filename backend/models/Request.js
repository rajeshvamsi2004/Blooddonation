const mongoose = require('mongoose');
const bloodSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Blood: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    enum: ['pending','rejected','accepted'],
    default: 'pending',
  },
  Time: {
    type: Date,
    default: Date.now
  }

},{collection: 'Requests'})
module.exports = mongoose.model('Request', bloodSchema)