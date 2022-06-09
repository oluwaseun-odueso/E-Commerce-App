const User = require('../models/userModel')
const bcrypt = require('bcrypt');


function createUser (username, first_name, last_name, email, address, phone_number, is_admin, password) {
    return new Promise((resolve, reject) => {
        const user = User.create({username, first_name, last_name, email, address, phone_number, is_admin, password}, (err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
    })
}

function checkLoginDetails (email, password) {
    return new Promise((resolve, reject) => {
        User.find({email: email, password: password}, (err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
    })
}

function getUserById (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, docs) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

function getUserByEmail (email) {
    return new Promise((resolve, reject) => {
        User.find({email}, (err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
    })
}

function getUserByIdAndUpdate(id, newDetails, obj) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, newDetails, obj, (err, docs) => {
            if (err) reject (err)
            resolve(docs)
        })
    })
}

function checkPasswords(password, confirm_password) {
    return new Promise((resolve, reject) => {
        if (password === confirm_password){
            resolve(true)
        } 
        else {
            resolve(false)
        }
    })
}

function checkIfUsernameExists (username) {
    return new Promise((resolve, reject) => {
        User.find({username}, (err, docs) => {
            if (docs.length == 1) resolve(true)
            else resolve(false)            
        })
    })
}

function checkIfEmailExists (email) {
    return new Promise((resolve, reject) => {
        User.find({email}, (err, docs) => {
            if (docs.length == 1)  resolve(true)
            else resolve(false)
        })
    })
}

function extractPassword (email) {
    return new Promise((resolve, reject) => {
        User.find({email}, (err, docs) => {
            if (err) reject(err)
            resolve(docs[0].password)
        })
    })
}

// extractPassword('seunoduez@gmail.com')
//     .then(result => console.log(result))


function checkIfEnteredPasswordEqualsHashed(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if (err) reject(err)
            resolve(result)
        });
    })
}

// async function checkIfEmailExists3 (email) {
//     try {
//         const user = await User.find({email})
//         return user
//     } catch (error) {
//         throw (error)
//     }
// }




// function checkIfEmailExists (email) {
//     return new Promise((resolve, reject) => {
//         const user = User.find({email: email})
//             .then(resolve(true))
//             .catch(reject(false))
//     })
// }

function hashEnteredPassword(password) {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            resolve(hash)
            reject(err)
        });
    })
}


const exported = {
    createUser, 
    checkLoginDetails, 
    getUserById,
    getUserByEmail, 
    getUserByIdAndUpdate, 
    checkPasswords, 
    checkIfUsernameExists,
    checkIfEmailExists, 
    extractPassword, 
    hashEnteredPassword, 
    checkIfEnteredPasswordEqualsHashed
}

module.exports = exported