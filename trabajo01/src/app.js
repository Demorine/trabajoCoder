const app = require('./server.js')
const { port } = require('./configs/server.configs.js')
const { Server } = require('socket.io')
const mongoConnect = require('./db/index.js')

const messagesModel = require('../src/dao/models/message.model')

mongoConnect()

const httpServer = app.listen(port, () => {
    console.log(`Iniciado en http://localhost:${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {

    console.log('Usuario conectado', socket.id)

    const updateChat = async() => {

        const allMessages = await messagesModel.find()
        socket.emit( "updateChat", allMessages )

    }

    updateChat()

    socket.on("sendMessage", async(msj) => {
        
        await messagesModel.create(msj)

        updateChat()

    })

})