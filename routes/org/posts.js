const express = require("express");

const postRouter = express.Router();

postRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your posts are underway!");
});

postRouter.route("/new").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Your NEW posts is underway!");
});

postRouter.route("/:id").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Your post ${req.params.id} is underway!`);
});

module.exports = postRouter;
