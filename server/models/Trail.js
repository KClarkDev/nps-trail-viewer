const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const trailSchema = new Schema({
  trailName: [
    {
      type: String,
    },
  ],
  parkName: {
    type: String,
  },
  // saved ObjectID from feature layer
  objectId: {
    type: String,
    required: true,
  },
});

module.exports = trailSchema;
