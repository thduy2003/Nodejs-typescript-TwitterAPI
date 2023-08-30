import { initFolder } from './utils/file'
import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import User from './models/schemas/User.schema'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import searchRouter from './routes/search.routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Conversation from './models/schemas/Conversation.schema'
import { ObjectId } from 'mongodb'
import conversationsRouter from './routes/conversations.routes'
import { verifyAccessToken } from './utils/commons'
import { TokenPayload } from './models/requests/User.requests'
import { UserVerifyStatus } from './constants/enums'
import { USERS_MESSAGES } from './constants/messages'
import HTTP_STATUS from './constants/httpStatus'
import { ErrorWithStatus } from './models/Errors'
import { SocketAddress } from 'net'
// import './utils/s3'
// import './utils/fake'
config()
const app = express()
const httpServer = createServer(app)
//instance io
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
//object lưu thông tin người dùng gồm key là _id của user và value socket_id của người đó
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
//instance socket
io.use(async (socket, next) => {
  // lấy ra accesstoken từ Authorization của client gửi lên
  const { Authorization } = socket.handshake.auth
  const access_token = Authorization?.split(' ')[1]
  try {
    const decoded_authorization = await verifyAccessToken(access_token)

    const { verify } = decoded_authorization as TokenPayload
    // kiểm tra xem tài khoản đã verified hay chưa, throw error chỗ  này thì thằng catch ở dưới sẽ bắt được luôn
    if (verify !== UserVerifyStatus.Verified) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_VERIFIED,
        status: HTTP_STATUS.FORBIDDEN
      })
    }
    // lấy được decoded_authorization thì mutate lại thằng auth để lấy được user_id dưới hàm connection socket
    socket.handshake.auth.decoded_authorization = decoded_authorization
    //mutate thêm thằng access_token cho thằng middleware socket ở dưới lấy được lun nha
    socket.handshake.auth.access_token = access_token
    // nếu đã verified không catch được lỗi nào thì next cho nó chạy xuống connection ở dưới
    next()
  } catch (error) {
    // phải truyền đúng định dạng của thằng next của io gồm object Error và 1 cái data thêm vào
    next({
      message: 'Unauthorized',
      name: 'UnauthorizedError',
      data: error
    })
  }
})
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  // lấy ra user_id khi đã chạy qua middleware socket ở trên từ decoded_authorization đã mutate lại
  const { user_id } = socket.handshake.auth.decoded_authorization as TokenPayload
  //lưu vào object users
  users[user_id] = {
    socket_id: socket.id
  }
  //middleware cho socket
  socket.use(async (packet, next) => {
    const { access_token } = socket.handshake.auth
    try {
      await verifyAccessToken(access_token)
      // không có lỗi thì next để cho nó chạy middleware ở dưới nha
      next()
    } catch (error) {
      next(new Error('Unauthorized'))
    }
  })
  // instance này để cho nhận được cái error nếu middleware trên catch về error
  socket.on('error', (error) => {
    if (error.message === 'Unauthorized') {
      socket.disconnect()
    }
  })
  //ví dụ có 2 thằng vào thì nó sẽ gọi 2 lần socket  nha tạm gọi là socket 1 và socket 2
  // thì thằng 1 emit với private message thì thằng socket1 mới nhận được nah, còn socket2 nó lắng nghe như này ko nhận đc

  socket.on('send_message', async (data) => {
    //lấy ra socket id của người nhận, sau đó emit lại message và to đến socket_id của người nhận thì nó sẽ gửi đến người nhận
    const { receiver_id, sender_id, content } = data.payload
    const receiver_socket_id = users[receiver_id]?.socket_id

    //lưu vào db đoạn tin nhắn
    const conversation = new Conversation({
      receiver_id: new ObjectId(receiver_id),
      sender_id: new ObjectId(sender_id),
      content: content
    })
    const result = await databaseService.conversations.insertOne(conversation)
    //gán _id vô cho conversation
    conversation._id = result.insertedId
    // nếu có socket_id của người nhận thì mới emit receive_messagem, bởi vì có thể gửi tin nhắn lúc người dùng nhận chưa connected mà
    if (receiver_socket_id) {
      socket.to(receiver_socket_id).emit('receive_message', {
        payload: conversation
      })
    }
  })
  socket.on('disconnect', () => {
    //khi disconnect thì phải xóa nó ra nha
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
    console.log(users)
  })
})
app.use(cors())
const port = process.env.PORT || 4000

//tạo folder upload
initFolder()
app.use(express.json())
//connect to database
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/search', searchRouter)
app.use('/conversations', conversationsRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
