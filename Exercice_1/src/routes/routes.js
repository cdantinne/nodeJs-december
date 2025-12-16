const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller.js')
const userController = require('../controllers/user.controller.js')


router.get('/todos', todoController.getAllTodos)
router.post('/todos', todoController.createTodo)

router.get('/users', userController.getUsers)
router.post('/users', userController.createData)


module.exports = router;