const express = require("express");
const app = express();
require("dotenv").config();


app.get("/",(req,res)=>{
    res.send("working")
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server started!!")
});