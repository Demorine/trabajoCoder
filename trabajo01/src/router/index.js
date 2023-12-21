const productController = require('../controller/productController.js')
const cartController = require('../controller/cartController.js')

const router = app => {
    
    app.use('/api/products', productController)
    app.use('/api/cart', cartController)

}

module.exports = router