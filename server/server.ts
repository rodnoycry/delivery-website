import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { config, prodDomain } from './config'
import {
    handleGetPromos,
    handleAddPromo,
    handleEditPromo,
    handleDeletePromo,
} from './api/promos'
import {
    handleItemsRequest,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
} from './api/items'
import {
    handleGetCarousels,
    handleAddCarousel,
    handleEditCarousel,
    handleDeleteCarousel,
} from './api/carousels'
import {
    handleNewOrder,
    handleGetOrders,
    handleEditOrder,
    handleGetUserOrders,
} from './api/orders'
import {
    handleGetUserData,
    handleCreateUserData,
    handleUpdateUserInputs,
    handleUpdateUserCart,
    handleGetUserCart,
    handleUpdateUserData,
    handleSetUserOrdersViewed,
} from './api/users'
import { onSocketMessage } from './socket/onConnection'
import { getUploader } from './functions'
import { checkAdmin } from './utils'
import {
    cacheItemsDb,
    cacheOrdersDb,
    cacheUsersDb,
    cacheBonusesDb,
} from './functions/cacheDb'

if (config.shouldCache) {
    cacheItemsDb().catch(console.error) // Initial items caching
    cacheOrdersDb().catch(console.error) // Initial orders caching
    cacheUsersDb().catch(console.error) // Initial users caching
    cacheBonusesDb().catch(console.error) // Initial bonuses caching
}

const app = express()
const server = http.createServer(app)
const port = 3000
export const io = new Server(server, {
    cors: {
        origin: config.isProduction ? prodDomain : 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

export const socketAuthMap = new Map<string, string>()

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        onSocketMessage(socket, message)
    })
})

app.use(cookieParser())

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())

// Adding client-side port for dev requestss
if (config.allowDevClient) {
    app.use(
        cors({
            origin: config.isProduction ? prodDomain : 'http://localhost:8080',
            credentials: true,
        })
    )
}

// Static handling
app.use('/images/items', express.static('public/images/items'))
app.use('/images/promos', express.static('public/images/promos'))
app.use('/images/carousels', express.static('public/images/carousels'))
app.use('/audio', express.static('public/audio'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.post('/api/admin/check', checkAdmin, (req: Request, res: Response) => {
    return res.send({ isAdmin: true })
})

// Items handling
app.post('/api/items/get', handleItemsRequest)

const itemsUpload = getUploader('./public/images/items')
app.post(
    '/api/items/add',
    itemsUpload.single('image'),
    checkAdmin,
    handleAddItem
)
app.post(
    '/api/items/edit',
    itemsUpload.single('image'),
    checkAdmin,
    handleEditItem
)
app.post('/api/items/delete', checkAdmin, handleDeleteItem)

// Promos handling
app.post('/api/promos/get', handleGetPromos)

const promosUpload = getUploader('./public/images/promos')
app.post(
    '/api/promos/add',
    promosUpload.single('image'),
    checkAdmin,
    handleAddPromo
)

app.post(
    '/api/promos/edit',
    promosUpload.single('image'),
    checkAdmin,
    handleEditPromo
)

app.post('/api/promos/delete', checkAdmin, handleDeletePromo)

// Carousels handling
app.post('/api/carousels/get', handleGetCarousels)

const carouselsUpload = getUploader('./public/images/carousels')
app.post(
    '/api/carousels/add',
    carouselsUpload.single('image'),
    checkAdmin,
    handleAddCarousel
)

app.post(
    '/api/carousels/edit',
    carouselsUpload.single('image'),
    checkAdmin,
    handleEditCarousel
)
app.post('/api/carousels/delete', checkAdmin, handleDeleteCarousel)

// Orders handling
app.post('/api/orders/add', handleNewOrder)
app.post('/api/orders/get', checkAdmin, handleGetOrders)
app.post('/api/orders/edit', checkAdmin, handleEditOrder)

// Users handling
app.post('/api/users/get', handleGetUserData)
app.post('/api/users/create', handleCreateUserData)
app.post('/api/users/update', handleUpdateUserData)
app.post('/api/orders/get-orders', checkAdmin, handleGetUserOrders)
app.post('/api/users/update-input-states', handleUpdateUserInputs)
app.post('/api/users/get-cart', handleGetUserCart)
app.post('/api/users/update-cart', checkAdmin, handleUpdateUserCart)
app.post('/api/users/orders-set-viewed', handleSetUserOrdersViewed)

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
