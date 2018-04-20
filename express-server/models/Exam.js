// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Exam Schema
var ExamSchema = new Schema({

  // Id of Exam
  id: {
    type: String,
    required: true
  },

  // Name of Exam
  name: {
    type: String,
    required: true
  },

  // Grade Scale of Exam
  gradeScale: {
    type: String,
    required: true
  },

  // Date of exam scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm a')
  },

});

// Create the Exam model with Mongoose
var Exam = mongoose.model('Exam', ExamSchema);

// Export the Model
module.exports = Exam;