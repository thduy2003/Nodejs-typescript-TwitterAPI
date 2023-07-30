import { loginController } from '~/controllers/users.controllers'
import { Router } from 'express'
import { loginValidator } from '~/middlewares/users.middlewares'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
export default usersRouter
