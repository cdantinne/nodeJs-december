let dotenv = require('dotenv')
let config = dotenv.config()
console.log(config);


module.exports = {
    PORT : config.parsed.PORT
}

