const Order = require('../models/orderModel')

function allOrders() {
    return new Promise((resolve, reject) => {
        const all = Order.find()
        console.log(all)
        if (error) reject(error)
        resolve(all)
    })
}

const functions = {
    allOrders
}

module.exports = functions