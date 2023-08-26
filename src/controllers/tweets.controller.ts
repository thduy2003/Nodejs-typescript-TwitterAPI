import { TWEETS_MESSAGES } from '~/constants/messages'
import { TweetParam, TweetQuery, TweetRequestBody } from '~/models/requests/Tweet.requests'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'
import { TweetType } from '~/constants/enums'
import { match } from 'assert'
export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const result = await tweetsService.createTweet(user_id, req.body)
  res.json({
    message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS,
    result
  })
}
export const getTweetController = async (req: Request, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  res.json({
    message: TWEETS_MESSAGES.GET_DETAIL_TWEET,
    result: tweet
  })
}
export const getTweetChildrenController = async (req: Request<TweetParam, any, any, TweetQuery>, res: Response) => {
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const user_id = req.decoded_authorization?.user_id
  const { tweets, total } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id as string,
    tweet_type,
    limit,
    page,
    user_id
  })
  res.json({
    message: TWEETS_MESSAGES.GET_TWEET_CHILDREN_SUCCESS,
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_pages: Math.ceil(total / limit)
    }
  })
}
