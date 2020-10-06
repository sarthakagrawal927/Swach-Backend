const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  lastSeenOn: {
    type: Date,
    default: Date.now,
  },
  cleanedOn: {
    type: Date,
  },
});

module.exports = Organization = mongoose.model(
  "organization",
  OrganizationSchema,
);
