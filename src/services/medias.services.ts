import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import fs from 'fs'
import { getNameFromFullName, handleUploadSingleImage } from '~/utils/file'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
config()
class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    await sharp(file.filepath).jpeg().toFile(newPath)
    //sau khi xử lý xong xóa các ảnh ở file temp đi
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/static/${newName}.jpg`
      : `http://localhost:${process.env.PORT}/static/${newName}.jpg`
  }
}
const mediasService = new MediasService()
export default mediasService
