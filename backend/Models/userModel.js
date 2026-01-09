const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    planType: {
        type: String,
        default: "FREE"
    }


}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;