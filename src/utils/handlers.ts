import { RequestHandler, Request, Response, NextFunction } from 'express'

export const wrapRequestHandler = <TParams>(func: RequestHandler<TParams, any, any, any>) => {
  return async (req: Request<TParams>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
