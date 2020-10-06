const mongoose = require("mongoose");
const keys = require("./keys");
const db = keys.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongo Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1); //exit process with failure
  }
};

module.exports = connectDB;
