import multer from 'multer'
import path from 'path'

const filePath = path.join(__dirname, '../public/pdf')

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, filePath)
  },
  filename(_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

export default multer({ storage })
