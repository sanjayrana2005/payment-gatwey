const express = require("express");
const authUser = require("../middleware/auth");
const createOrder = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/order",authUser,createOrder);
paymentRouter.post("/webhook",);

module.exports=paymentRouter;