const asyncHandler = require('express-async-handler')
const req = require('express/lib/request')

const {
    createProduct, 
    getProducts, 
    updateAProduct,
    deleteAProduct,
    findProductById
} = require('../functions/productFunctions')

// @desc     Create/Add product
// @route    POST/e-commerce/products/add_product
// @access   Public
const addProduct = async(req, res) => {
    if (req.body.description && req.body.quantity_in_stock && req.body.unit_price) {
        try {
            const newProduct = await createProduct(req.body.description, req.body.quantity_in_stock, req.body.unit_price)
            res.status(201).json(newProduct)
        } catch (error) {
            res.send({message : error.message})
        }
    }
    else {
        res.status(400).json({
            errno: "301",
            message: "Please add all fields"
        })
    }
}

// @desc     Read/Get product
// @route    GET/e-commerce/products/get_product
// @access   Public
const getAllProducts = async(req, res) => {
    const products = await getProducts()
    res.status(200).json(products)
}

// @desc     Update product
// @route    PATCH/e-commerce/products/update_product
// @access   Public
const updateProduct = asyncHandler(async(req, res) => {
    const product = await findProductById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    else {
        if (req.body.description && req.body.quantity_in_stock && req.body.unit_price) {
            const updatedProduct = await updateAProduct(req.params.id, req.body, {
                new: true
            })
            res.status(200).json(updatedProduct)
        }
        else{
            res.status(400).json({
                errno: "101",
                message: "Please add all fields"
            })
        }
    }
})

const deleteProduct = async(req, res) => {
    const product = await findProductById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const deletedProduct = await deleteAProduct(product)
    
    res.status(200).json(deletedProduct)
}

const toExport = {addProduct, getAllProducts, updateProduct, deleteProduct}

module.exports = toExport