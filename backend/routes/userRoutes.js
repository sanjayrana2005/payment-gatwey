const express = require("express");
const {  registerUserController, loginUserController } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup",registerUserController);
userRouter.post("/login",loginUserController);
// routes/auth.js
userRouter.get("/check", (req, res) => {
  const token = req.cookies.paymentToken;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({ authenticated: true });
});


module.exports = userRouter