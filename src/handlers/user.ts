import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    // shouldn't really try catch two asynchronous operations
    try {
        const user = await prisma.user.create({
            data: {
             username: req.body.username,
             password: await hashPassword(req.body.password) 
            }
        })
    
        const token = createJWT(user)
        res.json({ token })
    } catch (e) {
        // in reality you would wanna inspect e what type of error it is e.g. if it actually is a input failure or if its a 
        // db error
        e.type = 'input'
        next(e)
    }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.json({message: 'nope'})
        return
    }

    const token = createJWT(user)
    res.json({ token })
}