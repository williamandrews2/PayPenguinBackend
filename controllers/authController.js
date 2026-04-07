const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Sign a JWT so they're logged in immediately after registering
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

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
