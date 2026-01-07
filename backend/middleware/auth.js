const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const authUser =async (req, res, next) => {
    const { paymentToken } = req.cookies;
    try {
        if (!paymentToken) {
            return res.status(401).json({
                message: "Unauthorized login"
            })
        };

        const decode = jwt.verify(paymentToken, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const { userId } = decode;
        const user = await userModel.findOne({ _id : userId })
        req.user=user;
        next();
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = authUser;