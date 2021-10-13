const path = require('path');
const express = require('express');
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalError = require('./controller/errorController');

const app = express();
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

if (process.env.NODE_ENV === "dev") {
    app.use(morgan('dev'))
}
console.log('osama')
//access static file like overvieww.html
app.use(express.static( path.join(__dirname, 'public')))

//route handling if route are incorrect
app.all('*', (req,res, next) => {
    next(new AppError(`Con't find ${req.originalUrl} url`, 404));
})

//globaly error handling middelware
//this call direct when error occure
app.use(globalError)

module.exports = app;

