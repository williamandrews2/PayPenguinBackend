const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("./config/passport");
const app = express();

// PORT variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRouter = require("./routes/auth");
const billsRouter = require("./routes/bills");

app.use("/api/auth", authRouter);
app.use("/api/bills", billsRouter);

// basic error handler
app.use((err, req, res, next) => {
  s;
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

if (process.env.NODE_ENV !== "production") {
  // start the server
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server running on port ${PORT}`);
  });
}
