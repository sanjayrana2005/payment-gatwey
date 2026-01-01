const express = require("express");
const {  registerUserController, loginUserController } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup",registerUserController);
userRouter.post("/login",loginUserController);

module.exports = userRouter