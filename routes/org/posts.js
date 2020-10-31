const express = require("express");
const postRouter = express.Router();
const Post = require("../../models/Post");
const authenticate = require("../../config/authenticateOrg");

postRouter.get("/", authenticate.verifyOrg, async (req, res, next) => {
  try {
    const posts = await Post.find({
      pincode: { $in: req.body.org.location },
    }).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.send(err.message);
  }
});

postRouter.get("/:id", authenticate.verifyOrg, async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) res.send(post);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = postRouter;
