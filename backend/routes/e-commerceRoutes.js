const express = require('express')
const router = express.Router()
const {
    getOrders, 
    setOrder, 
    updateOrder, 
    deleteOrder
} = require('../controllers/e-commerceControllers')

router.route('/').get(getOrders).post(setOrder)

router.route('/:id').put(updateOrder).delete(deleteOrder)

module.exports = router