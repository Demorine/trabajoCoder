const app = require('./server.js')
const { port } = require('./configs/server.configs.js')
const { Server } = require('socket.io')

const httpServer = app.listen(port, () => {
    console.log(`Iniciado en http://localhost:${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id)
})