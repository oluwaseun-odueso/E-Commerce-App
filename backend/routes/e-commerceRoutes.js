const express = require('express')
const router = express.Router()
const {
    getOrders, 
    addToOrder, 
    updateOrder, 
    deleteOrder
} = require('../controllers/e-commerceControllers')

router.route('/').get(getOrders).post(addToOrder)

router.route('/:id').put(updateOrder).delete(deleteOrder)

module.exports = router