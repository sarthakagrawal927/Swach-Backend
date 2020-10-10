const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

const regRouter = express.Router();

regRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email not registered" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server serror");
    }
  },
);

module.exports = regRouter;
