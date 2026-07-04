const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("./config/passport");
const app = express();

const PORT = process.env.PORT || 3000;

// whitelist array from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// CORS must be first
app.use(cors(corsOptions));

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
