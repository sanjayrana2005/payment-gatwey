const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.type,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },


}, { timeStamps: true });

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;