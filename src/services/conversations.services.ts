import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class ConversationsService {
  async getConversations({
    receiver_id,
    sender_id,
    limit,
    page
  }: {
    receiver_id: string
    sender_id: string
    limit: number
    page: number
  }) {
    // điều kiện để lấy ra tất cả tin nhắn của 2 người trong cuộc trò chuyện là thuộc 1 trong 2 điều kiện này
    const match = {
      $or: [
        {
          sender_id: new ObjectId(sender_id),
          receiver_id: new ObjectId(receiver_id)
        },
        {
          receiver_id: new ObjectId(sender_id),
          sender_id: new ObjectId(receiver_id)
        }
      ]
    }
    // lấy ra các tin nhắn, dùng find thì phải có toArray() và phân trâng kéo đến đâu thì hiện tin nhắn đến đó
    const conversations = await databaseService.conversations
      .find(match)
      .sort({ created_at: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    const total = await databaseService.conversations.countDocuments(match)
    return {
      conversations,
      total
    }
  }
}
const conservationsService = new ConversationsService()
export default conservationsService
