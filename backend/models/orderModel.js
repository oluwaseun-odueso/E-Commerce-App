const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: [true, "ubiueofn"],
    },
    product_id: {
        type: Number,
        required: [true, "Please add product_id"]
    },
    quantity: {
        type: Number,
        required: [true, "Please add quantity"]
    },
    unit_price: {
        type: Number,
        required: [true, "Please add unit_price"]
    },
    total_price: {
        type: Number,
        required: [true, "Please add total_price"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', orderSchema)