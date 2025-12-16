const metadata = require('reflect-metadata')
const DataSource = require('typeorm').DataSource
const UserSchema = require("../models/user.entity")

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize : true,
    logging: true, 
    entities: [UserSchema]
})  

module.exports = AppDataSource