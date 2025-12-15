let dotenv = require('dotenv')
let config = dotenv.config()

module.exports = {
    PORT : config.parsed.PORT
}

