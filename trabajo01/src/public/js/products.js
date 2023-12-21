const socket = io()
const deleteProduct = document.getElementById('deleteProduct')

socket.on('connect', function () {
    console.log('Conectado al servidor')
});
