const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../model/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const helperResponse = require('../utils/helperResponse')

const signToken = id => jwt.sign({ id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN})
const createAndSendToken = (user, statusCode, res) => {

    const token = signToken(user._id)
    const cookieOption = {
    expires: new Date(Date.now()+ process.env.JWT_COOKIS_EXPIRE_IN * 24 * 60 * 60 * 100),
    httpOnly: true
    }
    if (process.env.NODE_ENV === "pro") cookieOption.secure = true;
    res.cookie('jwt', token, cookieOption)
    user.password = undefined
    res.status(statusCode).json({
    status: "successful",
    token,
    data:{
    user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    if (req.file !== undefined) {
        req.body.photo = req.file.filename;
      }
      const formFields = {
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "email": req.body.email,
          "address": req.body.address,
          "phoneNumber": req.body.phoneNumber,
          "photo": req.body.photo ,
          "password": req.body.password,
          "confirmpassword": req.body.confirmpassword
        };
      const user = await User.create(formFields)
      if (!user) {
          return next(new AppError('data not inserted', 400))
      }
    

    createAndSendToken(user, 201, res)
});

exports.login = catchAsync(async(req, res, next) => {
    const email = req.body.email;
    const  password = req.body.password;
    if (!email || !password) {
        return next(new AppError("email or password not empty"))
    }
    //select('+password') we can explictly allow the password field to be returned in your find call as follows
    const user = await User.findOne({email}).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError('please enter correct email and password'))
    }

    createAndSendToken(user, 201, res)
})

exports.protected = catchAsync(async (req, res, next) => {
    let token;
    //first check tokem is not empty
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('please first login', 401))
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decode.id);
    //check current user are not deleted
    if (!currentUser) {
        return next(new AppError('user are deleted', 401))
    }
    //check user are not chaning password
    if (await currentUser.changPasswordAfter(decode.iat)) {
        return next(new AppError('password are change please login again', 401))
    }
    req.user = currentUser;
    next();
});

exports.checkPermission = (...role) => (req, res, next) => {
    if (!role.includes(req.user.role)) {
        return next(new AppError('you do not permission to perfom this action'))
    }
    next();
}