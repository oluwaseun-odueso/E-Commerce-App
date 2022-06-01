const asyncHandler = require('express-async-handler')
const {createUser, checkLoginDetails} = require('../functions/userFunctions')

const User = require('../models/userModel')

// @desc     Create user account
// @route    POST/users/signUp
// @access   Private
const addUser = asyncHandler(async (req, res) => {
    if (req.body.username && req.body.first_name && req.body.last_name && req.body.email && req.body.address && req.body.phone_number && req.body.is_admin && req.body.password && req.body.confirm_password) {
        try {
            const newUser = await createUser(req.body.username, req.body.first_name, req.body.last_name, req.body.email, req.body.address, req.body.phone_number, req.body.is_admin, req.body.password)
            res.status(201).json(newUser)
        } 
        catch (error) {
            res.send({message : error.message})
        }
    }
    else {
        res.status(400).json({
            errno: "101",
            message: "Please add all fields"
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            const result = await checkLoginDetails(req.body.email, req.body.password)
            const user = JSON.parse(JSON.stringify(result[0]))

            if (result.length == 1) {
                res.status(200).send({
                    message : "You have successfully logged in.", 
                    user, 
                })
            }

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

const toExport = {addUser, loginUser}

module.exports = toExport