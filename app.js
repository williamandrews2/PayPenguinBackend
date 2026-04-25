const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("./config/passport");
const app = express();

const PORT = process.env.PORT || 3000;

// handle preflight requests before anything else
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://paypenguin.vercel.app");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRouter = require("./routes/auth");
const billsRouter = require("./routes/bills");

app.use("/api/auth", authRouter);
app.use("/api/bills", billsRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
