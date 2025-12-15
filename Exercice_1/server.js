import { PORT } from './config/config'
let path = require('path')
let http = require('http')

let server = http.createServer(PORT, ()=>{
    console.log(`Le serveur est lancé sur le PORT ${PORT}`);
    
})