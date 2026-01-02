const express = require("express");
const connectDB = require("./Config/connectDb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(cookieParser());

app.use("/api/user",userRouter);




app.get("/", (req, res) => {
    res.send("Backkend Running 🚀")
});

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        console.log("Db connected!!");
        app.listen(PORT, () => {
            console.log("Server started!!")
        });
    })
    .catch((error)=>{
        console.log("DB conntection error")
    })