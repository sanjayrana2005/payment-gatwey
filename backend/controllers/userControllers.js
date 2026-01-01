
const bcrypt = require("bcrypt");
const { registerUserValidation } = require("../Validation/userValidation");
const userModel = require("../Models/userModel");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        registerUserValidation(req);
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(409).json({
                message:"User already exists"  
            })
        }

        const hashPassword = await bcrypt.hash(password,10,)

        const newUser = await userModel.create({
            name,
            email,
            password:hashPassword
        });

        res.status(200).json({
            message:"User registerd",
            newUser
        })

    } catch (error) {
        console.log(error)
        if(error.name === "ValidationError"){
            return res.status(400).json({
                message:error.message
            })
        }
        res.status(500).json({
            message: "Internal server Error"
        });
    }
}

module.exports = {registerUser}
