const service = require('../services/todo.service.js')


/**
 * 
 */
exports.getAllTodos = (req, res) => {
    console.log(
        service.todoService.getTodoList()   
    );
}

/**
 * 
 */
exports.createTodo = (req,res) => {
    console.log(req);
}
