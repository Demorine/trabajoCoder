const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Ticket = require('../models/ticket.model')
const { updateProductStock } = require('../manager/productManager')
const { findCart } = require('../manager/cartManager')


async function createTicketFromCart(cartId) {
    try {

        const cart = await Cart.findById(cartId).populate('products')

        if (!cart) {

            return res.status(404).json({ status: 'error', error: 'carrito no encontrado'})
        
        }

        let totalPrice = 0

        for (const item of cart.products) {
            const product = await Product.findById(item._id)

            if (!product) {
                throw new Error ('Producto no encontrado')
            }

            totalPrice += product.price * item.quantity

        }

        for (const item of cart.products) {
            await updateProductStock(item._id, item.quantity)
        }

        const user = await User.findById(cart.userId)
        const userEmail = user.email

        const ticket = new Ticket({
            amount: totalPrice,
            purchaser: userEmail
        })

        await ticket.save()

        return ticket

    }   catch(error) {
        console.log({error})
        res.json({error})
    }
}

module.exports = { createTicketFromCart }