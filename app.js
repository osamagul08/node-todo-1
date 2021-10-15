const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')
const globalError = require('./controller/errorController');
const todoRoute = require('./routes/todoRoute')
const usersRoute = require('./routes/userRoute')

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//parse body of request
app.use(express.json())
if (process.env.NODE_ENV === "dev") {
    app.use(morgan('dev'));
}
//access static file like overvieww.html
app.use(express.static( path.join(__dirname, 'public')));



app.use('/todo', todoRoute);
app.use('/user', usersRoute);
//route handling if route are incorrect
app.all('*', (req,res, next) => {
    next(new AppError(`Con't find ${req.originalUrl} url`, 404));
});

//globaly error handling middelware
//this call direct when error occure
app.use(globalError);

module.exports = app;

