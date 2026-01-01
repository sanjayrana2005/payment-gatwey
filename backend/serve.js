const express = require("express");
const connectDB = require("./Config/connectDb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL
}));

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