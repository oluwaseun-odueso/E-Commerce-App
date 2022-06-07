const express = require('express')
const router = express.Router()
const { verifyToken } = require('../config/auth')

const {
    getOrders, 
    addToOrder, 
    updateOrder, 
    deleteOrder
} = require('../controllers/orderController')

router.get('/', verifyToken, getOrders)

router.post('/', addToOrder)

router.patch('/:id', verifyToken, updateOrder)

router.delete('/:id', verifyToken, deleteOrder)

module.exports = router