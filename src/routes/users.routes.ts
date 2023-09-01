import { GetProfileReqParams, UpdateMeReqBody } from './../models/requests/User.requests'
import {
  changePasswordController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  oauthController,
  refreshTokenController,
  resetPasswordController,
  unfollowController,
  updateMeController,
  verifyForgotPasswordController
} from './../controllers/users.controllers'
import {
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
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
import { filterMiddleware } from '~/middlewares/common.middlewares'

const usersRouter = Router()
/**
 * @openapi
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: duytrieudong@gmail.com
 *         password:
 *           type: string
 *           example: Duy2308!
 *
 *     SucessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlYzVmM2JhZjVmZGFmNDQ1ZWY0N2ZhIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE2OTM1NDA1OTMsImV4cCI6MTY5MzYyNjk5M30.0RHltg8PwzMOYNY4DzXmWyk6IHZV-SXKDo2nCxK_nq0
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlYzVmM2JhZjVmZGFmNDQ1ZWY0N2ZhIiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE2OTM1NDA1OTMsImV4cCI6MTcwMjE4MDU5M30.ak1Tc-JJKvYTeNWmTVX0_vilYnN9NvFHzjrBKNXm55A
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           example: "64ec5f3baf5fdaf445ef47fa"
 *         name:
 *           type: string
 *           example: "duy"
 *         email:
 *           type: string
 *           example: "duyaccphu2003+1@gmail.com"
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: "2003-08-23T08:26:33.781Z"
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: "2023-08-28T08:47:55.841Z"
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: "2023-08-28T09:26:31.033Z"
 *         verify:
 *           $ref: "#/components/schemas/UserVerifyStatus"
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           example: ['64ec5f3baf5fdaf445ef47fa', '64ec5f3baf5fdaf445ef47fa']
 *         bio:
 *           type: string
 *           example: "This is My bio"
 *         location:
 *           type: string
 *           example: "San Francisco, CA"
 *         website:
 *           type: string
 *           example: "www.example.com"
 *         username:
 *           type: string
 *           example: "useraa013e26836344318c926d8c697ba6a7"
 *         avatar:
 *           type: string
 *           example: "http://localhost:4000/images/avatars/avt.jpg"
 *         cover_photo:
 *           type: string
 *           example: "http://localhost:4000/images/avatars/avt.jpg"
 *
 *     UserVerifyStatus:
 *       type: number
 *       enum: [UnVerified, Verified, Banned]
 *       example: 1
 *
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng nhập
 *     description: Đăng nhập vào hệ thống
 *     operationId: login
 *     requestBody:
 *       description: Thông tin đăng nhập
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginBody"
 *       required: true
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login success
 *                 result:
 *                   $ref: "#/components/schemas/SuccessAuthentication"
 *       '422':
 *         description: Invalid input
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description. OAuth with Google
 *  Path: /oauth/google
 * Method: GET
 * Query: { code: string}
 */
usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))
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
 * Description. Refresh token
 *  Path: /refresh-token
 * Method: POST
 * Body: {refresh_token: string}
 */

usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))
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
/**
 * Description. Update my profile
 *  Path: /me
 * Method: PATCH
 * Header : {Authorization: Bearer <access_token>}
 * Body : UserSchema
 */

usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'avatar',
    'bio',
    'name',
    'username',
    'cover_photo',
    'date_of_birth',
    'website',
    'location'
  ]),
  wrapRequestHandler(updateMeController)
)
/**
 * Description. Get user profile
 *  Path: /:username
 * Method: GET
 
 */

usersRouter.get('/:username', wrapRequestHandler(getProfileController))
/**
 * Description. Follow someone
 *  Path: /follow
 * Method: POST
 * Header : {Authorization: Bearer <access_token>}
 * Body: {followed_user_id: string}
 */

usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)
/**
 * Description. UnFollow someone
 *  Path: /follow/user_id
 * Method: DELETE
 * Header : {Authorization: Bearer <access_token>}

 */

usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)
/**
 * Description. Change password
 *  Path: /change-password
 * Method: PUT
 * Header : {Authorization: Bearer <access_token>}
 * Body: {old_password: string, password: string, confirm_password: string}
 */

usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)
export default usersRouter
