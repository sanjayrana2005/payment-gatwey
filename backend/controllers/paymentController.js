const instance = require("../utils/razorpay");
const planAmount = require('../utils/constant');
const paymentModel = require("../Models/paymentModels");
require("dotenv").config();
const createOrder = async (req, res) => {
    const user = req.user;
    const { planType } = req.body;
    try {
        const receipt = `PAY-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2,6)}`;
         const key_id = process.env.RAZORPAY_KEY_ID;

        var options = {
            amount: planAmount[planType] * 100,  // Amount is in currency subunits. in paisa 
            currency: "INR",
            receipt,
            notes: {
                "name": user.name,
                "planType": planType
            }
        };
        const order = await instance.orders.create(options);

        const payment = new paymentModel({
            userId: req.user._id,
            paymentId: "",
            orderId: order.id,
            status: order.status,
            amount: order.amount / 100,
            currency: order.currency,
            receipt: order.receipt,
            notes: {
                name: order.notes.name,
                planType: order.notes.planType
            }
        });
        const saveOrder = await payment.save();
        res.json({
            saveOrder,
            key_id
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = createOrder