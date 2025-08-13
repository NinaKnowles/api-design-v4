// const http = require('http');


// simple API without frameworks
// Initiate get request by going to localhost 3001 

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/'){
//         console.log('hello from server')
//         res.end()
//     }
// })

// server.listen(3001, () => {
//     console.log('server on http://localhost:3001')
// })

import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'

import app from './server'

app.listen(config.port , ()=> {
    console.log(`hello on port http://localhost:${config.port}`)
})