require('reflect-metadata')
const AppDataSource = require('./config/data-source.js')
const config = require('./config/config.js')
const app = require('./app')
const PORT = config.PORT || 3000

AppDataSource.initialize().then(   
    app.listen(PORT, () => { 
        console.log(`le serveur est lancé sur le port ${PORT}`);
    })
).catch(console.error)

