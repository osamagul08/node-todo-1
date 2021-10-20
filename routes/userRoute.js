const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController')
const upload = require('../utils/fileUpload')

const routes = express.Router();



// post(upload.single('file'), userController.createUsers)
routes.route('/signup').post(upload.single('photo'), authController.signup)
routes.route('/login').post(authController.login);

routes.use(authController.protected);
routes.route('/updateme').patch(upload.single('photo'), userController.updateUser);

routes.use(authController.checkPermission('admin'))
routes.route('/').
get(userController.getAllusers);
routes.route('/:id').
get(userController.getUserById).
delete(userController.deleteUser);


module.exports = routes;