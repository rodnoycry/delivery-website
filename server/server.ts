import express from 'express'
import path from 'path'

const app = express()
const port = 3000

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')))

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})
