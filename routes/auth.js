const { Router } = require("express");
const authRouter = Router();
const { login } = require("../controllers/authController");

authRouter.get("/login", login);

module.exports = authRouter;
