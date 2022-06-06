const { reject } = require('bcrypt/promises')
const Product = require('../models/productModel')

function createProduct(description, quantity_in_stock, unit_price) {
    return new Promise((resolve, reject) => {
        const product = Product.create({
            description: description,
            quantity_in_stock: quantity_in_stock, 
            unit_price: unit_price
        })
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function getProducts() {
    return new Promise((resolve, reject) => {
        const products = Product.find()
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function updateAProduct(id, body, obj) {
    return new Promise((resolve, reject) => {
        const update = Product.findByIdAndUpdate(id, body, obj)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function deleteAProduct(product) {
    return new Promise((resolve, reject) => {
        const deleted = product.remove()
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function findProductById(id) {
    return new Promise((resolve, reject) => {
        const product = Product.findById(id)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

const toExport = {createProduct, getProducts, updateAProduct, deleteAProduct, findProductById}

module.exports = toExport