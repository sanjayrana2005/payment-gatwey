const instance = require("../utils/razorpay");
const planAmount = require('../utils/constant');
const paymentModel = require("../Models/paymentModels");
require("dotenv").config();
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')



const createOrder = async (req, res) => {
    const user = req.user;
    const { planType } = req.body;
    try {
        const receipt = `PAY-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 6)}`;
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
        console.log("order", order)

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

const webhookController = async (req, res) => {

    try {
        const webhookSignature = req.headers["x-razorpay-signature"];
        const isWebhookValid = validateWebhookSignature(
            JSON.stringify(req.body),
            webhookSignature,
            process.env.RAZORPAY_WEBHOOK_SECRET
        );

        if (!isWebhookValid) {
            return res.status(400).json({
                message: "webhook signature is not valid"
            })
        }

        //updating payment status in db
        const paymentDetails = req.body.payload.payment.entity;
        const payment = await paymentModel.findOne({
            orderId: paymentDetails.order_id
        });
        if (!payment) {
            console.log("❌ No payment found for orderId:", paymentDetails.order_id);
            return res.status(404).send("Payment not found");
        }
        payment.status = paymentDetails.status;
        payment.paymentId = paymentDetails.id
        await payment.save();


        // if(req.body.event =="payment.captured"){

        // }
        // if(req.body.event =="payment.failed"){

        // }

        res.status(200).json({
            message: "webhook recieved successfull"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createOrder,
    webhookController
}