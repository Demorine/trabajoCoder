const express = require('express')
const handlebars = require('express-handlebars')
const router = require('./router')
const app = express()
const cookieParser = require('cookie-parser')
//const fileStore = require('session-file-store')
const session = require('express-session')
const mongoStore = require('connect-mongo')

const { mongopass } = require('./configs/server.configs')

//const fileStorage = fileStore(session)

app.engine('handlebars', handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars')
app.use(express.static('src/public',))
app.use(express.json())
app.use(cookieParser('coder50000'))
app.use(session({
        secret: 'coderSecret',
        store: mongoStore.create({
            mongoUrl: mongopass,
            ttl: 60,
        }),
        //store: new fileStorage({path: './sessions', ttl: 60000})
    })
)

router(app)

// const { createServer } = require('http')
// const { Server } = require('socket.io')

// const httpServer = createServer()
// const io = new Server(httpServer, {})

// io.on('connection', (socket) => {
//     console.log('Usuario conectado', socket.id)
// })

module.exports = app