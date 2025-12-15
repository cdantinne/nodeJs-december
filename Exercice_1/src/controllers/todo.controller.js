const service = require('../services/todo.service.js')


/**
 * 
 */
exports.getAllTodos = (req, res) => {
    return service.todoService.getTodoList()   
}

/**
 * 
 */
exports.createTodo = (req,res) => {
    console.log(req);
    
}
