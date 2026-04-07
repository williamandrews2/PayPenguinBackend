const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    // session is set to false because we're using JWTs, not sessions

    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    if (!user) {
      return res.status(401).json({ message: info.message }); // 'Incorrect password' etc.
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  })(req, res, next); // passport.authenticate returns a function, so you call it immediately (immediately invoked)
};
