let todoModel = require('../models/todo.model.js')   
let model = todoModel.todoModel     


class TodoService {

    static getTodoList() {
        console.log(
         model.findAll()
        )
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


