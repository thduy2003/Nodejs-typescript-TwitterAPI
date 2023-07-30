import { Request, Response } from 'express'
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
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    res.json({
      message: 'Register successful'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
