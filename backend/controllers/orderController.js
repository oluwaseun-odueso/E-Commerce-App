const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

// @desc    Get user orders
// @route   GET/e-commerce/order
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()

    res.status(200).json(orders)
})

// @desc    Set user orders
// @route   POST/api/e-commerce
// @access  Private
const addToOrder = async (req, res) => {
    if (!req.body.user_id && !req.body.product_id && !req.body.quantity && !req.body.unit_price && !req.body.total_price && !req.body.date) {
        res.status(400)
        throw new Error("Please add all fields")
    }


    const order = await Order.create({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
        total_price: req.body.total_price,
        date: req.body.date
    })

    res.status(200).json(order)
}
 
// @desc    Update user order
// @route   PUT/api/e-commerce/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        res.status(400)
        throw new Error('Order not found')
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedOrder)
})

// @desc    Delete user orders
// @route   DELETE/api/e-commerce/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        res.status(400)
        throw new Error('Order not found')
    }

    const deletedOrder = await order.remove()

    res.status(200).json(deletedOrder)
})

const controls = {
    getOrders, 
    addToOrder, 
    updateOrder, 
    deleteOrder
}

module.exports = controls