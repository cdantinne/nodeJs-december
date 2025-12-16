const AppDataSource = require('../config/data-source.js')

class TagService {
    constructor(){
        this.tagRepository = AppDataSource.getRepository("Tag")
    }
    async findAll(){
        return await this.tagRepository.find()
    }
    async findById(id){
        return this.tagRepository.findOneBy({ id })
}
}

module.exports = TagService
