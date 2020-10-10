const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  byUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  desc: {
    type: String,
  },
  imageURL: {
    type: [String],
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cleanedBy: {
    type: Schema.Types.ObjectId,
    ref: "organization",
  },
  cleanedOn: {
    type: Date,
  },
});

module.exports = mongoose.model("post", PostSchema);
