import express, { Request, Response } from 'express'
import cors from 'cors'
import multer from 'multer'
import { body } from 'express-validator'
import path from 'path'
import { handleTestRequest } from './api'
import { handleAddItem, handleItemsRequest } from './api/items'
import { checkAdmin } from './utils'

const app = express()
const port = 3000

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())
// FOR TESTS ONLY
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
)
//

app.post(
    '/api/test',
    [body('name').notEmpty(), body('email').notEmpty()],
    handleTestRequest
)

app.use('/images/items', express.static('public/images/items'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.post('/api/admin/check', checkAdmin, (req: Request, res: Response) => {
    return res.send({ isAdmin: true })
})

app.post('/api/items/get', handleItemsRequest)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/items')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})
const upload = multer({ storage })
app.post('/api/items/add', upload.single('image'), checkAdmin, handleAddItem)

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
