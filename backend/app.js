const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/e-commerce', require('./routes/e-commerceRoutes'))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the E-Commerce home page" })
})

// Overwrites default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))