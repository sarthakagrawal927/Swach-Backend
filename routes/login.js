const express = require("express");

const loginRouter = express.Router();

loginRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your login is underway!");
});

module.exports = loginRouter;
