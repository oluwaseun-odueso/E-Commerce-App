const express = require('express')
const router = express.Router()
const {generateToken, verifyToken} = require('../config/auth')

const { 
    signUpUser, 
    loginUser, 
    updateAccountDetails
} = require('../controllers/userController')


router.post('/signUp', signUpUser)

router.post('/login', loginUser)

router.patch('/update_account_details', verifyToken, updateAccountDetails)

module.exports = router