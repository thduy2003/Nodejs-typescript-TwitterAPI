import { initFolder } from './utils/file'
import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import User from './models/schemas/User.schema'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { config } from 'dotenv'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
config()
const app = express()
const port = process.env.PORT || 4000
//tạo folder upload
initFolder()
app.use(express.json())
//connect to database
databaseService.connect()
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
// app.use('/static', express.static(UPLOAD_DIR))
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
