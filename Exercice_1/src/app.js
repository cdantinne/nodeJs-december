const express = require('express')
const app = express()
const ApiError = require('./errors/ApiError')

app.use(express.json())

app.use('/api', require('./routes/routes'))

// 404
app.use((req, res, next) => {
    next(ApiError.NotFoundError('Route introuvable'))
})

// error handler
app.use(require('./errors/errorHandler'))

module.exports = app