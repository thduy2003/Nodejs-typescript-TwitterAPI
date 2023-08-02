import { ErrorWithStatus } from './../models/Errors'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'duytrieudong@gmail.com' && password === '123123123') {
    res.status(200).json({
      message: 'login success'
    })
  }
  res.status(400).json({
    error: 'Login failed'
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: 'Register successful',
    result
  })
}
