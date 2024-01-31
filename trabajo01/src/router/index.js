const productController = require('../controller/product.controller.js')
const cartController = require('../controller/cart.controller.js')
const chatController = require('../controller/chat.controller.js')
const authController = require('../controller/auth.controller.js')
const usersController = require('../controller/users.controller.js')
const viewsTemplateController = require('../controller/views-template.controller.js')

const router = app => {
    
    app.use('/api/products', productController)
    app.use('/api/cart', cartController)
    app.use('/api/chat', chatController)
    app.use('/api/auth', authController)
    app.use('/api/users', usersController)
    app.use('/', viewsTemplateController)
}

module.exports = router