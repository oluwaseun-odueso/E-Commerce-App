const res = require('express/lib/response')
const User = require('../models/userModel')

function createUser (username, first_name, last_name, email, address, phone_number, is_admin, password) {
    return new Promise((resolve, reject) => {
        const user = User.create({
            username: username, 
            first_name: first_name, 
            last_name: last_name,
            email: email,
            address: address, 
            phone_number: phone_number, 
            is_admin: is_admin,
            password: password,
        })
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function checkLoginDetails (email, password) {
    return new Promise((resolve, reject) => {
        const user = User.find({email: email, password: password})
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function getUserById (id) {
    return new Promise((resolve, reject) => {
        const user = User.findById(id)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

function getByIdAndUpdate (id, newDetails, obj) {
    return new Promise((resolve, reject) => {
        const newUpdate = User.findByIdAndUpdate(id, newDetails, obj)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

const exported = {createUser, checkLoginDetails, getUserById, getByIdAndUpdate}

module.exports = exported