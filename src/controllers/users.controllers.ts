import { Request, Response } from 'express'
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
