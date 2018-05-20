// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Course Schema
var CourseSchema = new Schema({

  // Course id
  "Course ID": {
    type: String,
    required: true
  },

  // Subject of course
  Subject: {
    type: String,
    required: true
  },

  // Code of course
  Catalog: {
    type: String,
    required: true
  },

  // Name of course
  "Long Title": {
    type: String,
    required: true
  },

  // Date of course scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm a')
  },

});

// Create the Course model with Mongoose
var Course = mongoose.model('Course', CourseSchema);

// Export the Model
module.exports = Course;