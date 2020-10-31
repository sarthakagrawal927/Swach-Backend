const express = require("express");
const passport = require("passport");

const { check, validationResult } = require("express-validator");
const authenticate = require("../../config/authenticateOrg");

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
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate("local", (err, org, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!org) {
          const error = new Error("Not registered.");
          return next(error);
        }
        req.login(org, { session: false }, (error) => {
          if (error) return next(error);

          const body = { _id: org._id, email: org.email };
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
