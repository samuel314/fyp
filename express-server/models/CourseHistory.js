// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Token Schema
var CourseHistorySchema = new Schema({

  // User ID that the course history is from
  _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },

  // Course code of the course
  course: {
      type: String,
      required: true
  },

  // Name of the course
  description: {
      type: String,
      required: true
  },

  // Term when the course is taken
  term: {
      type: String,
      required: true
  },

  // Grade of the course
  grade: {
      type: String,
      required: true
  },

  // Number of credits of the course
  units: {
      type: String,
      required: true
  },

  // Status of the course (Taken, Transferred, In Progress)
  status: {
      type: String,
      reuqired: true
  },

  // Date of Course History retrieved or updated (saving as a strubg ti pretify it in Moment-JS)
  updated: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm a')
  }
  
});

// Create the CourseHistory model with Mongoose
var CourseHistory = mongoose.model('CourseHistory', CourseHistorySchema);

// Export the Model
module.exports = CourseHistory;