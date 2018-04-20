// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create MajorRequirement Schema
var MajorRequirementSchema = new Schema({

  // Id of requirement
  id: {
    type: String,
    required: true
  },

  // Category of requirement
  category: {
    type: String,
    required: true
  },

  // Course code list of requirement
  courseList: [{
    code: String
  }],
  
  // Requirement list of requirement
  requirementList: [{
    rid: String
  }],
  
  // Condition of requirement
  condition: [{
    logic: String
  }],

  // Credits of requirement
  credits: [{
    units: String
  }],

  // Date of major requirement scrape (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm A')
  },

});

// Create the MajorRequirement model with Mongoose
var MajorRequirement = mongoose.model('MajorRequirement', MajorRequirementSchema);

// Export the Model
module.exports = MajorRequirement;