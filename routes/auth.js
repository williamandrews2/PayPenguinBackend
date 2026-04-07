const { Router } = require("express");
const authRouter = Router();
const { login, register } = require("../controllers/authController");

authRouter.post("/login", login);

authRouter.post("/register", register);

module.exports = authRouter;
