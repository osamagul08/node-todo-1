const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')


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
    address:String,
    phoneNumber: String,
    role: {
        type: String,
        enum:['admin', 'lead-guid', 'guid', 'user'],
        default: 'user'
    },
    password :{
        type: String,
        minlength: 8,
        required: true,
        select: false
    },
    confirmpassword: {
        type: String,
        required: true,
        validate : { validator:function(el) {
            return el === this.password
            },
            message: "password must be same"
        }
    },
    active:{
        type: Boolean,
        default: true,
        select: false
    },
    passworChangAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date

})

userShema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcryptjs.hash(this.password, 10)
    this.confirmpassword = undefined
    next()
})
//then this one
userShema.pre('save',  function(next) {
    if (!this.isModified('password')) return next()
    this.passworChangAt = Date.now()-1000;
    next()
})

userShema.methods.checkPassword = async function (condidatePassword, userPassword) {
    return await bcryptjs.compare(condidatePassword, userPassword);
}
userShema.methods.changPasswordAfter = async function(JWTTimeStimp) {
    if (this.passworChangAt) {
        const changTimeSecond = parseInt(this.passworChangAt.getTime()/1000, 10)
        return JWTTimeStimp < changTimeSecond;
    }
    return false;
}
const User = mongoose.model('User', userShema);
module.exports = User;