// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create ExamTransfer Schema
var ExamTransferSchema = new Schema({

  // Id of exam
  id: {
    type: String,
    required: true
  },

  // Name of exam
  exam: {
    type: String,
    required: true
  },

  // Subject of ExamTransfer
  subject: {
    type: String,
    required: true
  },
  
  // Minimum grade of ExamTransfer
  minGrade: {
    type: String,
    required: true
  },
  
  // Transfer course code of ExamTransfer
  transferCourseCode: {
    type: String,
    required: true
  },

  // Credits of ExamTransfer
  credits: {
    type: String,
    required: true
  },

  // Valid duration of ExamTransfer
  validUntil: {
    type: String,
    required: true
  },

  // DB reference number of ExamTransfer
  dbReferenceNo: {
    type: String,
    required: true
  },

  // Date of exam transfer scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm A')
  },

});

// Create the ExamTransfer model with Mongoose
var ExamTransfer = mongoose.model('ExamTransfer', ExamTransferSchema);

// Export the Model
module.exports = ExamTransfer;