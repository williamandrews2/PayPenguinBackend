const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
require("dotenv").config();
const app = express();

// PORT variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// start the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running on port ${PORT}`);
});
