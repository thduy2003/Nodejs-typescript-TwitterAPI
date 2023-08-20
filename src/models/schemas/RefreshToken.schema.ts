import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  iat: number
  exp: number
}
export default class RefreshToken {
  //đặt dấu ? vì gửi lên không cần truyền id mongo tự tạo òi
  _id?: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId
  exp: Date
  iat: Date
  constructor({ _id, token, created_at, user_id, exp, iat }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
    this.exp = new Date(exp * 1000)
    this.iat = new Date(iat * 1000)
  }
}
