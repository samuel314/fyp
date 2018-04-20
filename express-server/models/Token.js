// Require Mongoose
var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Token Schema
var TokenSchema = new Schema({

  // User ID that the token is for
  _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },

  // Token
  token: {
      type: String,
      required: true
  },
  
  // Create date of the token
  createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200
  }

});

// Create the Token model with Mongoose
var Token = mongoose.model('Token', TokenSchema);

// Export the Model
module.exports = Token;