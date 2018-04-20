// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Institution Schema
var InstitutionSchema = new Schema({

  // Id of Institution
  id: {
    type: String,
    required: true
  },

  // Type of Institution
  type: {
    type: String,
    required: true
  },

  // Name of Institution
  name: {
    type: String,
    required: true
  },

  // Location of Institution
  location: {
    type: String,
    required: true
  },

  // Date of institution scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm a')
  },

});

// Create the Institution model with Mongoose
var Institution = mongoose.model('Institution', InstitutionSchema);

// Export the Model
module.exports = Institution;