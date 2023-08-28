import { TokenPayload } from './../models/requests/User.requests'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SearchQuery } from '~/models/requests/search.requests'
import searchService from '~/services/search.services'
export const searchController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const content = req.query.content
  const user_id = req.decoded_authorization?.user_id as string
  const media_type = req.query.media_type
  const result = await searchService.search({ limit, page, content, user_id, media_type })

  res.json({
    message: 'search successful',
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: result.total ? Math.ceil(result.total / limit) : 0
    }
  })
}
