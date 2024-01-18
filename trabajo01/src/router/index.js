const productController = require('../controller/productController.js')
const cartController = require('../controller/cartController.js')
const chatController = require('../controller/chatcontroller.js')

const router = app => {
    
    app.use('/api/products', productController)
    app.use('/api/cart', cartController)
    app.use('/api/chat', chatController)
}

module.exports = router