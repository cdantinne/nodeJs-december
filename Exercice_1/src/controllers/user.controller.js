const UserService = require('../services/user.service')
const service = new UserService()

exports.getUsers = async (req, res, next) => {
    try {
        const users = await service.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

exports.createData = async (req, res, next) => {
    try {
        const user = await service.createData(req.body)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}