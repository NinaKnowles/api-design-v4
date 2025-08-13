import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

// This will make the API
const app = express()

// config for who can access the api 
app.use(cors())
app.use(morgan('dev'))

// this middleware allows the client to send us json 
app.use(express.json())
// allows a client to add things like a query string and parameters otherwise it just treats it as a string
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    req.shhhh_secret = 'doggy'
    next()
})

app.get('/', (req, res, next) => {
    res.json({message : 'Hello'})
})

// use allows you to apply a global config to a certain path or the whole app
app.use('/api', protect, router) 
app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message : 'unauthorised'})
    } else if (err.type === 'input' ){
        res.status(400).json({message: 'invalid input'})
    } else {
        res.status(500).json({message: 'oops thats on us'})
    }
})


export default app