import { Request, Response } from 'express'
import { request } from 'http'
import { GetConversationsParam } from '~/models/requests/Conversation.requests'
import conservationsService from '~/services/conversations.services'

export const getConservationsController = async (req: Request<GetConversationsParam>, res: Response) => {
  const user_id = req.decoded_authorization?.user_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await conservationsService.getConversations({
    sender_id: user_id,
    receiver_id: req.params.receiver_id,
    limit,
    page
  })
  res.json({
    message: 'get conversations successfully',
    result: {
      conversations: result.conversations,
      limit,
      page,
      total_pages: Math.ceil(result.total / limit)
    }
  })
}
