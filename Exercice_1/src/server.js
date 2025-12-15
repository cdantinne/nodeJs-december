const config = require('../config/config.js')
const express = require('express')
const app = express()
const PORT = config.PORT || 3000


app.listen(PORT, () => { 
    console.log(`le serveur est lancé sur le port ${PORT}`);
})
