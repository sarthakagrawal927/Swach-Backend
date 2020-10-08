const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const regRouter = express.Router();

regRouter.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      return res.json("User saved");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server s error");
    }
  },
);

module.exports = regRouter;