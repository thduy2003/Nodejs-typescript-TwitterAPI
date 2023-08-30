import { Router } from 'express'
import { getConservationsController } from '~/controllers/conservations.controllers'
import { paginationValidator } from '~/middlewares/tweet.middlewares'
import { accessTokenValidator, getConversationsValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const conversationsRouter = Router()
conversationsRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  getConversationsValidator,
  paginationValidator,
  wrapRequestHandler(getConservationsController)
)
export default conversationsRouter
