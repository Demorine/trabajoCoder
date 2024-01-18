const socket = io()
const Message = require('../dao/models/message.model')

io.on('connection', (socket) => {
    console.log('Usuario conectado: ', socket.id)
})

socket.on('disconnect', () => {
    console.log('Usuario desconectado: ', socket.id)
})

socket.on('sendMessage', (data) => {
    const newMessage = new Message({
        user: data.user,
        message: data.message
    })

    newMessage.save()
    .then( () => {
        return Message.find().sort({ _id: -1}).limit(10)
    })
    .then((messages) => {
        io.emit('updateChat', messages.reverse())
    })
    .catch((error) => {
        console.error('Error al guardar mensaje: ', error)
    })
})

// socket.on('updateChat', function(messages) {
//     updateChat(messages)
// })

// function sendMessage(user, message) {
//     socket.emit('sendMessage', {user, message})
// }

// function updateChat(messages) {
//     const chatMessages = document.getElementById('chatMessages')
//     chatMessages.innerHTML = ''

//     messages.forEach(function(message) {
//         var paragraph = document.createElement('p')
//         paragraph.textContent = message.user + ': ' + message.message
//         chatMessages.appendChild(paragraph)
//     })
// }

// document.getElementById('chatForm').addEventListener('submit', function(event) {
//     event.preventDefault()
//     const user = document.getElementById('user').value
//     const message = document.getElementById('message').value
//     sendMessage(user, message)
// })