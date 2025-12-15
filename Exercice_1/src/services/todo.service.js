const todoModel = require('../models/todo.model.js')   
const model = todoModel.todoModel     
const asyncHandler = require('../utils/asyncHandler.js').asyncHandler
const ApiError = require('../errors/ApiError.js')
const NotFoundError = ApiError.NotFoundError
const ValidationError = ApiError.ValidationError


class TodoService {

    static getTodoList() {

       return new Promise((resolve,reject)=>{
        if (model.findAll() != []) {
           resolve(model.findAll())
        } else {
            reject(NotFoundError(
                {message:"Aucune donnée trouvée",
                    statusCode: 400}
            ))
        }
                
            })
       
            
    }

    // Todo doit être sous la forme {title : String, completed : Boolean}
    // L'ID s'incrémente tout seul
    static CreateTodo(todo) {
        if (todo.title != undefined) {
            return model.create(todo)
        } else {
            throw new ValidationError(
                {message:"Un titre est nécessaire",
                    statusCode: "400"}
            )
        }
    }


}

module.exports={
    todoService:TodoService
}


