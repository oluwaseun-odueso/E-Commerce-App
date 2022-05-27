const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "Get orders" })
})

router.post('/', (req, res) => {
    res.status(200).json({ message: "Set orders" })
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Update order ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Delete order ${req.params.id}` })
})

module.exports = router