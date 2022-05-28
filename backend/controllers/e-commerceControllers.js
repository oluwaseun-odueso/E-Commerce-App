const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

// @desc    Get user orders
// @route   GET/api/e-commerce
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()

    res.status(200).json(orders)
})

// @desc    Set user orders
// @route   POST/api/e-commerce
// @access  Private
const addToOrder = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add an order")
    }

    const order = await Order.create({
        text: req.body.text
    })

    res.status(200).json(order)
})
 
// @desc    Update user order
// @route   PUT/api/e-commerce/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update order ${req.params.id}` })
})

// @desc    Delete user orders
// @route   DELETE/api/e-commerce/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete order ${req.params.id}` })
})

const controls = {
    getOrders, 
    addToOrder, 
    updateOrder, 
    deleteOrder
}

module.exports = controls