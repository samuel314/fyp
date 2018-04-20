// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create CreditTransfer Schema
var CreditTransferSchema = new Schema({

  // Id of institution
  id: {
    type: String,
    required: true
  },

  // Name of institution
  institution: {
    type: String,
    required: true
  },

  // Subject of CreditTransfer
  subject: {
    type: String,
    required: true
  },
  
  // Course code of CreditTransfer
  courseCode: {
    type: String,
    required: true
  },
  
  // Transfer course code of CreditTransfer
  transferCourseCode: {
    type: String,
    required: true
  },

  // Credits of CreditTransfer
  credits: {
    type: String,
    required: true
  },

  // Restriction of CreditTransfer
  restriction: {
    type: String,
    required: true
  },

  // Valid duration of CreditTransfer
  validUntil: {
    type: String,
    required: true
  },

  // DB reference number of CreditTransfer
  dbReferenceNo: {
    type: String,
    required: true
  },

  // Date of credit transfer scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm A')
  },

});

CreditTransferSchema.index({ subject: "text", courseCode: "text", transferCourseCode: "text", credits: "text", restriction: "text", validUntil: "text", dbReferenceNo: "text" },{name: "MyTextIndex"});

// Create the CreditTransfer model with Mongoose
var CreditTransfer = mongoose.model('CreditTransfer', CreditTransferSchema);

// Export the Model
module.exports = CreditTransfer;