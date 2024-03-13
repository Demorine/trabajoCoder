const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Ticket = require('../models/ticket.model')
const { updateProductStock } = require('../manager/productManager')
const { findCart } = require('../manager/cartManager')


async function createTicketFromCart(cartId) {
    try {

        const cart = findCart(cartId).populate('products')

        if (!cart) {

            return res.status(404).json({ status: 'error', error: 'carrito no encontrado'})
        
        }

        const productIds = cart.products.map(products => products._id)

        const products = await Product.find({ _id: { $in: productIds } })

        let totalPrice = 0

        products.forEach(product => {
            totalPrice += product.price
        })

        // for (const item of cart.products) {
        //     const { productId, quantity, } = item

        //     await updateProductStock( productId, quantity)
        // }

        const user = await User.findById(cart.userId)
        const userEmail = user.email

        const ticket = new Ticket({
            amount: totalPrice,
            purchaser: userEmail
        })

        await ticket.save()

        return ticket

    }   catch(error) {
        res.json({error})
    }
}

module.exports = { createTicketFromCart }