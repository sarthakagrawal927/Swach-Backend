const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Organization = require("../models/Organization");

const keys = require("./keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretKey,
};

exports.getToken = function (user) {
  return jwt.sign(user, keys.secretKey, { expiresIn: 36000000 });
};

exports.localPassport = passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      Organization.findOne({ email }, async (err, org) => {
        if (err) {
          return done(err);
        }
        if (!org) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, org.password);

        if (!isMatch) {
          return done(new Error("Incorrect password"));
        }
        return done(null, org);
      });
    },
  ),
);

exports.jwtPassport = passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload);
    Organization.findById(jwt_payload._id, (err, org) => {
      if (err) {
        return done(err, false);
      }
      if (org) {
        return done(null, org);
      } else {
        return done(null, false);
      }
    });
  }),
);

exports.verifyOrg = passport.authenticate("jwt", { session: false });
