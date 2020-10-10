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
    unique: true,
  },
  location: {
    type: [String],
  },
  lastSeenOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Organization = mongoose.model(
  "organization",
  OrganizationSchema,
);
