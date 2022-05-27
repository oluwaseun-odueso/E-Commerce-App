const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/e-commerce', require('./routes/e-commerceRoutes'))


app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the E-Commerce home page" })
})

app.listen(port, () => console.log(`Server started on port ${port}`))