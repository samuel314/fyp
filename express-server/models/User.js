// Include the momentJS library
var moment = require("moment");

// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create User Schema
var UserSchema = new Schema({

  // Username of User
  username: {
    type: String,
    required: true
  },

  // Email of User
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Gender of User
  gender: {
    type: String,
    required: true
  },

  // Admission Type of User
  admitType: {
    type: String,
    required: true
  },

  // User is local or not
  local: {
    type: String,
    required: true
  },

// Roles of User
  roles: [{ 
    type: 'String' 
  }],

  // Verification of User
  isVerified: {
    type: Boolean,
    default: false
  },

  // Login status of User
  isLogin: {
    type: Boolean,
    default: false
  },

  // Password of User
  password: {
    type: String,
    required: true
  },

  // Password Reset Token of User
  passwordResetToken: String,

  // Password Reset Expiry time of User
  passwordResetExpires: Date,

  // Date of User signup (saving as a string to pretify it in Moment-JS)
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm a')
  },

});

// Create the User model with Mongoose
var User = mongoose.model('User', UserSchema);

// Export the Model
module.exports = User;