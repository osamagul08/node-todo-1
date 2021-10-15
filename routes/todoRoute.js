const express = require('express');
const todoController = require("../controller/todoController")

const routes = express.Router();

routes.route('/').
get(todoController.getAllTodo).
post(todoController.createTodo);

routes.route('/:id').post(todoController.getById).
patch(todoController.updateTodo).
delete(todoController.deleteTodo);

module.exports = routes;