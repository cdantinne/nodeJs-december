const ApiError = require('../errors/ApiError.js')
const NotFoundError = ApiError.NotFoundError
const ValidationError = ApiError.ValidationError
const AppDataSource = require('../config/data-source.js')

class TodoService {
    constructor() {
        this.todoRepository = AppDataSource.getRepository('Todo')
        this.userRepository = AppDataSource.getRepository('User')
        this.tagRepository = AppDataSource.getRepository('Tag')
    }

    static async getTodoList() {
       return await this.todoRepository.find()
    }

    static async CreateTodo(data, userId, tags) {
        if (data.title != undefined) {
            let user = this.userRepository.findOneBy({ userId })
            let allTags = this.tagRepository.findBy(tags)
            if (user == undefined) {
                throw new NotFoundError('User not found')
            }
            const todo = this.todoRepository.create({
                title: data,
                completed: false,
                user: user,
                tags: allTags || []
            })
            return await this.todoRepository.save(todo)
            // return model.create(todo)
        } else {
            throw new ValidationError("A title is necessary")
        }
    }


}

module.exports={
    TodoService
}


