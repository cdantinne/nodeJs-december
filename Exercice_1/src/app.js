const express = require('express')
const app = express()
const ApiError = require('./errors/ApiError')
const passport = require('passport')          
require('./config/passport.js')(passport) 
const authRoutes = require('./routes/auth.routes.js')


app.use(express.json())
app.use(passport.initialize()); 

app.use('/api', require('./routes/routes'))
app.use('/user', authRoutes)

// 404
app.use((req, res, next) => {
    next(new ApiError.NotFoundError('Route introuvable'))
})

// error handler
app.use(require('./errors/errorHandler'))

module.exports = app