const path = require('path')
const http = require('http')
const config = require('../config/config.js')
const express = require('express')
const app = express()

const PORT = config.PORT

app.use('/', require('./routes/routes.js'))

app.listen(PORT, () => { 
    console.log(`le serveur est lancé sur le port ${PORT}`);
    
})
