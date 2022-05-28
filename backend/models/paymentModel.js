const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user_id: {
        type: Number,
        require: [true, "Please create a user_id"]
    },
    payment_status: {
        type: String,
        require: [true, "Please add a payment_status"]
    },
    payment_method: {
        type: String,
        require: [true, "Please add a payment_method"]
    },
    order_id: {
        type: Number,
        require: [true, "Please add a order_id"]
    }
})

module.exports = mongoose.model('Payments', paymentSchema)