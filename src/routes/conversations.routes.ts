import { Router } from 'express'
import { getConservationsController } from '~/controllers/conservations.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
const conversationsRouter = Router()
conversationsRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  getConservationsController
)
export default conversationsRouter
