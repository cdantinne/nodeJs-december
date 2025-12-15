const express = require('express')
const app = express()
const ApiError = require('./errors/ApiError.js')
const NotFoundError = ApiError.NotFoundError

app.use('/api/todos', require('./routes/routes.js'))

app.use('', ()=>{
    const error = NotFoundError('Route introuvable')
    next(error)
})

app.use('next', require('./errors/errorHandler.js'))