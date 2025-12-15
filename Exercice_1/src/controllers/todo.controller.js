const service = require('../services/todo.service.js')
const asyncHandler = require('../utils/asyncHandler.js').asyncHandler


/**
 * 
 */
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await service.todoService.getTodoList()
        res.json(todos)
    } catch (error) {
        res.status(500)
    }
}

/**
 * 
 */
exports.createTodo = (req,res) => {
    console.log(req);
}
