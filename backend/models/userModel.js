const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please create a username"]
    },
    first_name: {
        type: String,
        require: [true, "Please add a first_name"]
    },
    last_name: {
        type: String,
        require: [true, "Please add a username"]
    },
    email: {
        type: String,
        require: [true, "Please add a username"]
    },
    address: {
        type: String,
        require: [true, "Please add a username"]
    },
    city: {
        type: String,
        require: [true, "Please add a username"]
    },
    state: {
        type: String,
        require: [true, "Please add a username"]
    },
    phone_number: {
        type: Number,
        require: [true, "Please add a username"]
    }
})

module.exports = mongoose.model('Users', userSchema)