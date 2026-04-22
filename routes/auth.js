const { Router } = require("express");
const authRouter = Router();
const { login, register } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation");
const validate = require("../middleware/validate");

authRouter.post("/login", loginValidation, validate, login);

authRouter.post("/register", registerValidation, validate, register);

// logout will live on the frontend, we will just remove the JWT token

module.exports = authRouter;
