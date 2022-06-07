const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: [true, "Please create a user_id"]
    },
    payment_status: {
        type: String,
        required: [true, "Please add a payment_status"]
    },
    payment_method: {
        type: String,
        required: [true, "Please add a payment_method"]
    },
    order_id: {
        type: Number,
        required: [true, "Please add a order_id"]
    }
})

module.exports = mongoose.model('Payment', paymentSchema)