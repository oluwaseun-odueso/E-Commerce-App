const express = require('express')
const router = express.Router()
const { 
    addUser, 
    loginUser
} = require('../controllers/userController')


router.post('/signUp', addUser)

router.post('/login', loginUser)

module.exports = router