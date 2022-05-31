const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    quantity_in_stock: {
        type: Number,
        required: [true, "Please add quantity_in_stock"]
    },
    unit_price: {
        type: Number,
        required: [true, "Please add the unit_price"]
    }
})

module.exports = mongoose.model('Products', productSchema)