import { ErrorWithStatus } from './../models/Errors'
import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  //để cho thằng err.message có thể lấy được string vì object Error nó không có method to JSON nên JSON.stringify(err) nhận từ Object Error ra empty object
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    errorInfo: omit(err, ['stack'])
  })
}
