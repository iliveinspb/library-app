const multer = require('multer')
const path = require('path')
const filePath = path.join(__dirname, '../public/pdf');


const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, filePath)
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})