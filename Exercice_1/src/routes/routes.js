const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo.controller.js')


router.get('/', controller.getAllTodos)
router.post('/', controller.createTodo)


module.exports = router;