const asyncHandler = require('express-async-handler')
const {
    createUser, 
    getUserByEmail, 
    getUserById, 
    getUserByIdAndUpdate, 
    extractPassword,
    checkPasswords, 
    checkIfUsernameExists, 
    checkIfEmailExists, 
    hashEnteredPassword,
    checkIfEnteredPasswordEqualsHashed
} = require('../functions/userFunctions')
const {generateToken} = require('../config/auth')


// @desc     Create user account
// @route    POST/e-commerce/users/signUp
const signUpUser = asyncHandler(async (req, res) => {
    const {username, first_name, last_name, email, address, phone_number, is_admin, password, confirm_password} = req.body
    if (username && first_name && last_name && email && address && phone_number && is_admin && password && confirm_password) {
        try {
            const checkUsername = await checkIfUsernameExists(username)
            if (checkUsername === false) {
                const checkEmail = await checkIfEmailExists(email)
                if (checkEmail === false ) {
                    const checkBothPasswords = await checkPasswords(password, confirm_password)
                    if (checkBothPasswords == true) {
                        const hashedPassword = await hashEnteredPassword(password)
                        await createUser(username, first_name, last_name, email, address, phone_number, is_admin, hashedPassword)
                        const userDetails = await getUserByEmail(email)
                        res.status(201).json(userDetails)
                    }
                    else {
                        res.status(400).json({
                            errno:"115" ,
                            message : "Password and confirm password do not match"
                        })
                    }
                }
                else {
                    res.status(400).send({
                        errno:"113" ,
                        message : "Cannot add an existing email."
                    })
                } 
            }
            else {
                res.status(400).send({
                    errno:"113" ,
                    message : "Cannot add an existing username."
                })
            } 
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
    const {email, password} = req.body
    if (email && password) {
        try {
            const checkEmail = await checkIfEmailExists(email)

            if (checkEmail === true) {
                const hashedPassword = await extractPassword(email)
                const checkPassword = await checkIfEnteredPasswordEqualsHashed(password, hashedPassword)

                if (checkPassword === true) {
                    const userDetails = await getUserByEmail(email)
                    const user = JSON.parse(JSON.stringify(userDetails[0]))


                    const token = await generateToken(user)

                    res.status(200).send({
                        message : "You have successfully logged in.", 
                        user, 
                        token
                    })
                }
                else {
                    res.status(401).send({
                        errno:"116" ,
                        message : "Incorrect Password."
                    })
                }
            }
            else {
                res.status(401).send({
                    errno:"116" ,
                    message : "Incorrect Email."
                })
            }
        } catch (error) {
            res.send({message : error.message})
        }
    }
    else {
        res.status(400).json({
            errno: "101",
            message: "Please enter email and password"
        })
    }
}

// @desc     Update user account details
// @route    PATCH/e-commerce/users/login/update_account_details
// @access   Private
const updateAccountDetails = async (req, res) => {
    const {username, first_name, last_name, email, address, phone_number, is_admin} = req.body
    if (username && first_name && last_name && email && address && phone_number && is_admin) {
        try {
            const user = await getUserByEmail(req.user.email)
            if (username === user[0].username && email === user[0].email) {
                await getUserByIdAndUpdate(req.user._id, req.body, {new: true})
                const updatedDetails = await getUserByEmail(email)                
                res.status(200).json(updatedDetails)
            }
            else if (username === user[0].username && email !== user[0].email) {
                const checkEmail = await checkIfEmailExists(email)
                console.log('Check Point 3')

                if (checkEmail === false) {
                    await getUserByIdAndUpdate(req.user._id, req.body, {new: true})
                    const updatedDetails = await getUserByEmail(email)
                    res.status(200).json(updatedDetails)
                }
                else {
                    res.status(400).json({
                        errno: "111",
                        message: "Email already exists"
                    })
                }
            }
            else if (username !== user[0].username && email === user[0].email) {
                const checkUsername = await checkIfUsernameExists(username)

                if (checkUsername === false) {
                    await getUserByIdAndUpdate(req.user._id, req.body, {new: true})
                    const updatedDetails = await getUserByEmail(email)
                    res.status(200).json(updatedDetails)
                }
                else {
                    res.status(400).json({
                        errno: "101",
                        message: "Username already exists"
                    })
                }
            }
            else {
                const checkUsername = await checkIfUsernameExists(username)
                const checkEmail = await checkIfEmailExists(email)

                if (checkUsername === false && checkEmail === false) {
                    await getUserByIdAndUpdate(req.user._id, req.body, {new: true})
                    const updatedDetails = await getUserByEmail(email)
                    res.status(200).json(updatedDetails)
                }
                else if (checkUsername === true && checkEmail === false) {
                    res.status(400).json({
                        errno: "101",
                        message: "Username already exists"
                    })
                }
                else if (checkUsername === false && checkEmail === true) {
                    res.status(400).json({
                        errno: "121",
                        message: "Email already exists"
                    })
                }
                else {
                    res.status(400).json({
                        errno: "101",
                        message: "Username and email already exists"
                    })
                }
            }
        } 
        catch (error) {
            res.json({message : error.message})
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