// models/frontendDataSchema.js
const mongoose = require('mongoose');

const frontendDataSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Assuming you want to associate frontend data with a user
  location: { type: String, required: true },
});

const FrontendData = mongoose.model('FrontendData', frontendDataSchema);

module.exports = FrontendData;
