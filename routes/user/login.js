const express = require("express");
const passport = require("passport");

const { check, validationResult } = require("express-validator");
const authenticate = require("../../config/authenticate");

const loginRouter = express.Router();

loginRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter passwrod").notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    passport.authenticate("local", (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        if (!user) {
          const error = new Error("Not registered.");
          return next(error);
        }

        req.login(user, { session: false }, (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = authenticate.getToken(body);

          return res.json({ success: true, token: token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
);

module.exports = loginRouter;
