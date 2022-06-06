const express = require('express')
const router = express.Router()
const {verifyToken} = require('../config/auth')
const { auth } = require('../middleware/authenticationMiddleware')

const {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

router.post('/add_product', verifyToken, auth, addProduct)

router.get('/get_product', getAllProducts)

router.patch('/update_product/:id', verifyToken, auth, updateProduct)

router.delete('/delete_product/:id', verifyToken, auth, deleteProduct)

module.exports = router