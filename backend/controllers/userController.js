const asyncHandler = require('express-async-handler')
const {createUser, checkLoginDetails, getUserById, getUserByIdAndUpdate} = require('../functions/userFunctions')
const {generateToken} = require('../config/auth')


// @desc     Create user account
// @route    POST/e-commerce/users/signUp
const signUpUser = asyncHandler(async (req, res) => {
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

// @desc     Login user
// @route    POST/e-commerce/users/login
// @access   Private
const loginUser = async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            const result = await checkLoginDetails(req.body.email, req.body.password)
            const user = JSON.parse(JSON.stringify(result[0]))
            const token = await generateToken(user)

            if (result.length == 1) {
                res.status(200).send({
                    message : "You have successfully logged in.", 
                    user, 
                    token
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
}

// @desc     Update user account details
// @route    POST/e-commerce/users/login/update_account_details
// @access   Private
const updateAccountDetails = async (req, res) => {
    if (req.body.username && req.body.first_name && req.body.last_name && req.body.email && req.body.address && req.body.phone_number && req.body.is_admin) {
        try {
            const user = await getUserById(req.user._id)
            if(!user) {
                res.status(400)
                res.json('User not found')
            }

            const updatedDetails = await getUserByIdAndUpdate(req.user._id, req.body, {new: true})
        
            res.status(200).json(updatedDetails)
        } 
        catch (error) {
            res.send({message : error.message})
        }
    }
    else {
        res.status(400).json({
            errno: "101",
            message: "Please enter all fields"
        })
    }
}

const toExport = {signUpUser, loginUser, updateAccountDetails}

module.exports = toExport