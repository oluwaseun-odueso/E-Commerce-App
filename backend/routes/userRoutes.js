const express = require('express')
const router = express.Router()
const {addUser} = require('../controllers/userController')

router.post('/signUp', addUser)

router.post('/login', async(req, res) => {
    if (req.body.email && req.body.password) {
        try {
            
        } catch (error) {
            res.send({message : error.message})
        }
    }
    else {
        res.status(400).json({
            errno: "101",
            message: "Please enter username and password"
        })
    }
})

module.exports = router