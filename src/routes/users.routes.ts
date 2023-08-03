import { emailVerifyTokenValidator } from './../middlewares/users.middlewares'
import { refreshTokenValidator, accessTokenValidator } from '~/middlewares/users.middlewares'
import {
  emailVerifyController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import { Router } from 'express'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { json } from 'stream/consumers'

const usersRouter = Router()
/**
 * Description. Login a user
 *  Path: /login
 * Method: POST
 * Body: { email: string, password: string}
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description. Register a new user
 *  Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * Description. Logout a user
 *  Path: /logout
 * Method: POST
 * Header : {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
/**
 * Description. Verify email when user click on the link in email
 *  Path: /verify-email
 * Method: POST

 * Body: {email_verify_token: string}
 */

usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))
export default usersRouter
