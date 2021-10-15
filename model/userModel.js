const mongoose = require('mongoose')
const validator = require('validator')

const userShema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please enter First name']
    },
    lastName: {
        type: String,
        required: [true, 'please enter Last name']
    },
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        lowercase : true,
        validate : [validator.isEmail, 'please enter correct email']
    },
    photo: String,
    address: {
        type: String,
        required: [true, 'please enter Last name']
    },
    phoneNumber: String,

})

const User = mongoose.model('User', userShema);
module.exports = User;