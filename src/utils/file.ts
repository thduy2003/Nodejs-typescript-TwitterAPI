import { Request } from 'express'
import { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // mục đích là để tạo folder nested
    })
  }
}
export const handleUploadSingleImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  //đầu tiên lưu ảnh vào file tạm qua services xử lý ảnh rồi lưu vào uploads thật
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 300 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve((files.image as File[])[0])
    })
  })
}
export const getNameFromFullName = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
