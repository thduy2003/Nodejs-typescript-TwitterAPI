import { RequestHandler, Request, Response, NextFunction } from 'express'

export const wrapRequestHandler = <TParams>(func: RequestHandler<TParams>) => {
  return async (req: Request<TParams>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
