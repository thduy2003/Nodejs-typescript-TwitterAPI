import { USERS_MESSAGES } from '~/constants/messages'
import { NextFunction, Request, Response } from 'express'
import path from 'path'
import mediasService from '~/services/medias.services'
import { handleUploadSingleImage } from '~/utils/file'
export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleUploadSingleImage(req)
  return res.json({
    mesage: USERS_MESSAGES.UPLOAD_SUCESS,
    result: url
  })
}
