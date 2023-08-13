import { ObjectId } from 'mongodb'

interface FollowerType {
  _id?: ObjectId
  followed_user_id: ObjectId
  created_at?: Date
  user_id: ObjectId
}
export default class Follower {
  //đặt dấu ? vì gửi lên không cần truyền id mongo tự tạo òi
  _id?: ObjectId
  followed_user_id: ObjectId
  created_at: Date
  user_id: ObjectId
  constructor({ _id, followed_user_id, created_at, user_id }: FollowerType) {
    this._id = _id
    this.followed_user_id = followed_user_id
    this.created_at = created_at || new Date()
    this.user_id = user_id
  }
}
