const Product = require('../models/product.model')
const Cart = require('../models/cart.model')

async function findProduct() {

    return Product.find().lean()

}

async function paginate(findQuery, options) {

    return Product.paginate(findQuery, options)

}

async function addProductsToCart(cartId, products) {
        
        console.log(products, cartId)

        const cart = Cart.findById(cartId)

        if (!cart) {

            console.log({ error: 'El carrito no existe'})

        }

        for (const { _id, quantity } of products) {

            const product = await Product.findById(_id)

            if (!product) {

                console.log({ error: `El producto con ID: ${_id} no existe`})

            }

            if (product.stock < quantity) {
                
                console.log({ error: `No hay stock suficiente para el producto con ID: ${_id}`})

            }

            cart.products.push({ _id, quantity})

        }

        await cart.save()

        return cart

}

async function updateProductStock(productId, quantity) {

    try {

        const product = await Product.findById(productId)

        if (product.stock >= quantity) {

            product.stock -= quantity

            await product.save()

        } else {
            console.log('No hay stock del producto en cuestion.')
        }

    } catch (error) {
        res.json({error})
    }

}

module.exports = {
    findProduct,
    paginate,
    addProductsToCart,
    updateProductStock,
}