const express = require('express');
const userController = require('../controller/userController');
const upload = require('../utils/fileUpload')

const routes = express.Router();


routes.route('/').
get(userController.getAllusers).
post(upload.single('file'), userController.createUsers)

routes.route('/:id').
get(userController.getUserById).
delete(userController.deleteUser).
patch(userController.updateUser);

module.exports = routes;