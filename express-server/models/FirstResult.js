// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create FirstResult Schema
var FirstResultSchema = new Schema({

  // Antecedent
  lhs: {
    type: String,
    required: true
  },

  // Consequent
  rhs: {
    type: String,
    required: true
  },

  // Support percentage
  support: {
    type: String,
    required: true
  },

  // Confidence percentage
  confidence: {
    type: String,
    required: true
  },

  // Lift percentage
  lift: {
    type: String,
    required: true
  },

  // Date of first result scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm a')
  },

});

// Create the FirstResult model with Mongoose
var FirstResult = mongoose.model('FirstResult', FirstResultSchema);

// Export the Model
module.exports = FirstResult;