import { TokenPayload } from './models/requests/User.requests'
import { Request } from 'express'
import User from './models/schemas/User.schema'
declare module 'express' {
  interface Request {
    //thêm vô để có interface cho req.user nhưng mà phải thêm dấu ? vì không phải request nào cũng có user
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
  }
}
