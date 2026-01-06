
const bcrypt = require("bcrypt");
const { registerUserValidation, loginUserValidation } = require("../Validation/userValidation");
const userModel = require("../Models/userModel");
const generateToken = require("../utils/generateToken");

const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        registerUserValidation(req);
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10,)

        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        });

        const token = generateToken(newUser._id);
        res.cookie("paymentToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        const safeUser = await userModel.findOne({email})

        res.status(200).json({
            message: "User registerd",
            safeUser
        })

    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            })
        }
        res.status(500).json({
            message: "Internal server Error"
        });
    }
}

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        loginUserValidation(req);
        const user = await userModel.findOne({ email }).select("password");
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const decode = await bcrypt.compare(password, user.password);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = generateToken(user._id);
        res.cookie("paymentToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        const safeUser = await userModel.findById(user._id).select("-password");


        res.status(200).json({
            message: "Login successfull",
            safeUser
        })
    } catch (error) {
        if (error.name === "validationError") {
            return res.status(400).json({
                message: error.message
            })
        }
        res.status(500).json({
            message: "Internal server Error"
        })
    }
}

const logoutController = async (req, res) => {
  try {
    res.clearCookie("paymentToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",// true in production (HTTPS)
      sameSite: "strict",  // REQUIRED for frontend-backend different domains
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};




module.exports = { registerUserController, loginUserController,logoutController }
