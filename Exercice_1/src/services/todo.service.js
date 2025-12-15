const todoModel = require('../models/todo.model.js')   
const model = todoModel.todoModel     
const asyncHandler = require('../utils/asyncHandler.js').asyncHandler


class TodoService {

    static getTodoList() {

       return new Promise((resolve)=>{
                resolve(model.findAll())
            })
       
            
    }

    // Todo doit être sous la forme {title : String, completed : Boolean}
    // L'ID s'incrémente tout seul
    static CreateTodo(todo) {
        if (todo.title != undefined) {
            return model.create(todo)
        } else {
            console.log('ERROR 400');
        }
    }


}

module.exports={
    todoService:TodoService
}


