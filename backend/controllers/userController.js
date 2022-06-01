const asyncHandler = require('express-async-handler')
const {createUser} = require('../functions/userFunctions')

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

const toExport = {addUser}

module.exports = toExport