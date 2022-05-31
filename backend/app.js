const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')
const orderRoutes = require('./routes/orderRoutes')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/e-commerce/orders', orderRoutes)
// app.use('/e-commerce/users', require('./routes/userRoutes'))


app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the E-Commerce home page" })
})

// Overwrites default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))