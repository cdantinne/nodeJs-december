
let todoList = [{ id: 1, title: "Faire les courses", completed: false },
            { id: 2, title: "Faire les achats", completed: false },
            { id: 3, title: "Faire les voitures", completed: true }]

class TodoModel {
        static todos = todoList

        static findAll() {
            return new Promise((resolve)=>{
                resolve(this.todos)
            })
        }

        static create(todo) {
            return new Promise((resolve)=>{
                let increment = todoList[todoList.length-1].id
                let newTodo = {
                    id : (increment+1),
                    ...todo
                }
                this.todos.push(todoList)
                resolve(newTodo)
            })
            
        }

    }

    module.exports={
        todoModel: TodoModel
    }