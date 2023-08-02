import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import User from './models/schemas/User.schema'
const app = express()
const port = 3000
app.use(express.json())
//connect to database
databaseService.connect()
app.use('/users', usersRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
