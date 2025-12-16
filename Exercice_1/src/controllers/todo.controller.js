const { ServerApiVersion } = require('typeorm')
const service = require('../services/todo.service.js')


/**
 * 
 */
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await service.TodoService.getTodoList()
        res.json(todos)
    } catch (error) {
        res.status(500)
    }
}

/**
 * 
 */
exports.createTodo = async (req,res) => {
    try {
        const body = req.body
        const todos = await service.createTodo(body.title, body.userId)
        res.json(todos)
    } catch (error) {
        res.status(300)
    }
}
