const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripDetails: {
    date: { type: String, required: true },
    location: { type: String, required: true },
    activities: { type: String, required: true },
    type: { type: String, required: true },
  },
  people: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      sex: { type: String, required: true },
      healthIssues: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model('Trip', tripSchema);
