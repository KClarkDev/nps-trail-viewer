const { Schema } = require("mongoose");

// This is a subdocument schema
const trailSchema = new Schema({
  trailName: {
    type: String,
  },

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
