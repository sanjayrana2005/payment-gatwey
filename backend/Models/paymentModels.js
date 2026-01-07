const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String
    },
    receipt: {
        type: String,
        required: true
    },
    notes: {
        name: {
            type: String
        },
        planType: {
            type: String
        }
    }


}, { timeStamps: true });

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;