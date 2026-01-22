const express = require("express");
const { registerUserController, loginUserController, logoutController } = require("../controllers/userControllers");
const authUser = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/login", loginUserController);
// routes/auth.js
userRouter.get("/check", authUser, (req, res) => {

  const user = req.user

  res.json({
    authenticated: true,
    user
  });
});

userRouter.post("/logout", logoutController);


module.exports = userRouter