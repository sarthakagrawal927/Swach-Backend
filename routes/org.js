const express = require("express");

const orgRouter = express.Router();

orgRouter.route("/").all((req, res, next) => {
  res.statusCode = 404;
  res.end("Not FOUND");
});

orgRouter.route("/login").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your ORIGIN login is underway!");
});

orgRouter.route("/register").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your ORIGIN registration is underway!");
});

module.exports = orgRouter;
