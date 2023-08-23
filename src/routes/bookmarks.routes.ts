import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controller'
import { tweetIdValidator } from '~/middlewares/tweet.middlewares'

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
bookmarksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
)
/**
 * Description. UNBookmark tweet
 *  Path: /tweets/:tweet_id
 * Method: DELETE
 * Header : {Authorization: Bearer <access_token>}
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unbookmarkTweetController)
)
export default bookmarksRouter
