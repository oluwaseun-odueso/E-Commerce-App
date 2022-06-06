const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/e-commerce/orders', orderRoutes)
app.use('/e-commerce/users', userRoutes)
app.use('/e-commerce/products', productRoutes)


app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the E-Commerce home page" })
})

// Overwrites default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))