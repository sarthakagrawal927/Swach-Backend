const express = require("express");
const postRouter = express.Router();
const Post = require("../../models/Post");

postRouter.route("/").get(async (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.send(err.message);
  }
});

postRouter.route("/:id").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Your post ${req.params.id} is underway!`);
});

module.exports = postRouter;
