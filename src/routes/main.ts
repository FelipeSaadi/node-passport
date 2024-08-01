import { Router } from 'express'
import { privateRoute } from '../config/passport'
import * as userController from '../controllers/user'

export const router = Router()

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.get('/users', privateRoute, userController.getAll)

router.post('/register', userController.register)

router.post('/login', userController.login)