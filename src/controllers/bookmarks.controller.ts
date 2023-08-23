import { TWEETS_MESSAGES } from '~/constants/messages'

import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/User.requests'
import { BookmarkTweetReqBody } from '~/models/requests/Bookmark.request'
import bookmarkService from '~/services/bookmarks.services'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, any, BookmarkTweetReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)
  res.json({
    message: TWEETS_MESSAGES.BOOKMARK_TWEET_SUCCECSS,
    result
  })
}
