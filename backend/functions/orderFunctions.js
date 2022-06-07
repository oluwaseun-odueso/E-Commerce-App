const Order = require('../models/orderModel')

function findAllOrders(user_id) {
    return new Promise((resolve, reject) => {
        const orders = Order.find({user_id: user_id})
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function createOrder(user_id, product_id, quantity, unit_price, total_price) {
    return new Promise((resolve, reject) => {
        const order = Order.create({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            unit_price: unit_price,
            total_price: total_price,
        })   
            .then(result => resolve(result))
            .catch(error => reject(error)) 
    })
}

function getOrderById (id) {
    return new Promise((resolve, reject) => {
        const user = Order.findById(id)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

// function getUserIdForOrder() {
//     return new Promise((resolve, reject) => {
//         const userId = Order.find({})
//     })
// }

const functions = {
    findAllOrders, 
    createOrder
}

module.exports = functions