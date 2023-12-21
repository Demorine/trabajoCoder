const express = require('express')
const handlebars = require('express-handlebars')
const router = require('./router')
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

app.use(express.static(process.cwd() + '/src/public'))
app.use(express.json())

router(app)

// const { createServer } = require('http')
// const { Server } = require('socket.io')

// const httpServer = createServer()
// const io = new Server(httpServer, {})

// io.on('connection', (socket) => {
//     console.log('Usuario conectado', socket.id)
// })

module.exports = app