const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
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