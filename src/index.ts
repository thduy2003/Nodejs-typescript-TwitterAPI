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
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  //bên client gửi socket.auth = 1 object chứa key là _id nên dùng như này để lấy ra _id của user đó
  const user_id = socket.handshake.auth._id
  //lưu vào object users
  users[user_id] = {
    socket_id: socket.id
  }
  console.log(users)
  //ví dụ có 2 thằng vào thì nó sẽ gọi 2 lần socket  nha tạm gọi là socket 1 và socket 2
  // thì thằng 1 emit với private message thì thằng socket1 mới nhận được nah, còn socket2 nó lắng nghe như này ko nhận đc

  socket.on('private message', async (data) => {
    //lấy ra socket id của người nhận, sau đó emit lại private message và to đến socket_id của người nhận thì nó sẽ gửi đến người nhận
    const receiver_socket_id = users[data.to]?.socket_id
    //nếu không có socket id của người nhận thì không làm gì
    if (!receiver_socket_id) return
    //lưu vào db đoạn tin nhắn
    await databaseService.conversations.insertOne(
      new Conversation({
        receiver_id: new ObjectId(data.to),
        sender_id: new ObjectId(data.from),
        content: data.content
      })
    )
    socket.to(receiver_socket_id).emit('receive private message', {
      content: data.content,
      from: user_id //vd người 1 gửi message thì đoạn này nhận được user_id của người 1 nha
    })
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
