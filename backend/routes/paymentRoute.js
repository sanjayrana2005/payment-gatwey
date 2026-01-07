const express = require("express");
const authUser = require("../middleware/auth");

const paymentRouter = express.Router();

paymentRouter.post("/order",authUser,(req,res)=>{
    res.send("hii")
});
module.exports=paymentRouter;