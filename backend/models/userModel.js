const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please create a username"]
    },
    first_name: {
        type: String,
        required: [true, "Please add a first_name"]
    },
    last_name: {
        type: String,
        required: [true, "Please add a username"]
    },
    email: {
        type: String,
        required: [true, "Please add a username"],
        unique: true
    },
    address: {
        type: String,
        required: [true, "Please add a username"]
    },
    city: {
        type: String,
        required: [true, "Please add a username"]
    },
    state: {
        type: String,
        required: [true, "Please add a username"]
    },
    phone_number: {
        type: Number,
        required: [true, "Please add a username"]
    },
    is_admin: {
        type: Boolean,
        required: [true]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)