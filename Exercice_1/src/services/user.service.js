const AppDataSource = require('../config/data-source.js')

class UserService {
    constructor(){
        this.userRepository = AppDataSource.getRepository("User")
    }
    async findAll(){
        return await this.userRepository.find()
    }
    async createData(data){
        const newUser = this.userRepository.create(data); 
        return await this.userRepository.save(newUser)
    }
    async findById(id){
        return this.userRepository.findOneBy({ id })
}
}

module.exports = UserService

