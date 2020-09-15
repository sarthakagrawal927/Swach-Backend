const express = require("express");

const regRouter = express.Router();

regRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your registration is underway!");
});

module.exports = regRouter;
