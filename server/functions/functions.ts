import multer from 'multer'
import path from 'path'

export const getUploader = (uploadPath: string): multer.Multer => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            cb(
                null,
                `${file.fieldname}-${Date.now()}${path.extname(
                    file.originalname
                )}`
            )
        },
    })
    const upload = multer({ storage })
    return upload
}
