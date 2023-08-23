import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controller'

import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()
/**
 * Description. Bookmark tweet
 *  Path: /
 * Method: POST
 * Body: {tweet_id: string}
 * Header : {Authorization: Bearer <access_token>}
 */
bookmarksRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookmarkTweetController))
/**
 * Description. UNBookmark tweet
 *  Path: /
 * Method: DELETE
 * Header : {Authorization: Bearer <access_token>}
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unbookmarkTweetController)
)
export default bookmarksRouter
