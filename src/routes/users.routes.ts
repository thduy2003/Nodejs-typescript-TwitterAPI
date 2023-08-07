import {
  forgotPasswordController,
  getMeController,
  resetPasswordController,
  verifyForgotPasswordController
} from './../controllers/users.controllers'
import {
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
} from './../middlewares/users.middlewares'
import { refreshTokenValidator, accessTokenValidator } from '~/middlewares/users.middlewares'
import {
  verifyEmailController,
  loginController,
  logoutController,
  registerController,
  resendverifyEmailController
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

usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))
/**
 * Description. Resend Verify email when user click on the link in resend email
 *  Path: /resend-verify-email
 * Method: POST
 * Header : {Authorization: Bearer <access_token>}
 * Body: {}
 */

usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendverifyEmailController))
/**
 * Description. Submit email to reset password, send link to email of users
 *  Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */

usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
/**
 * Description. Verify link in email to reset password
 *  Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)
/**
 * Description. reset password
 *  Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string, password: string, confirm_password: string}
 */

usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
/**
 * Description. Get my profile
 *  Path: /me
 * Method: GET
 * Header : {Authorization: Bearer <access_token>}
 */

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))
export default usersRouter
