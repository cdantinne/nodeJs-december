const metadata = require('reflect-metadata')
const DataSource = require('typeorm').DataSource
const UserSchema = require("../models/user.entity.js")
const TodoSchema = require('../models/todo.entity.js')
const TagSchema = require('../models/tag.entity.js')

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize : true,
    logging: true, 
    entities: [UserSchema, TodoSchema, TagSchema]
})  

module.exports = AppDataSource