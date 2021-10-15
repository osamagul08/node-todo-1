const TODO =require('../model/todoModel');
// const APIFeatuer = require('./../utils/apiFeatuer')
const factory = require('./handlerFactory');

exports.createTodo = factory.createOne(TODO);

exports.getAllTodo = factory.getAll(TODO);
exports.updateTodo = factory.updateOne(TODO);
exports.deleteTodo = factory.deleteOne(TODO);
exports.getById = factory.getOne(TODO);