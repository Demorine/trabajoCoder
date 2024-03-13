const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const { findUserById } = require('../manager/userManager')
const { addProductsToCart } = require('../manager/productManager')

async function findCart(cartId) {

    return await Cart.findById(cartId)

}

async function updateCart(req, res) {

    const { cid } = req.params
    const { products } = req.body

    try {
        
        const cart = await addProductsToCart(cid, products)

        res.status(200).json({message: 'Productos Agregados', cart})
    } catch (error) {
        console.log({error})
        res.json({error})
    }
}

async function associateCartToUser(userId, cartId) {
    try {

        const user = findUserById(userId)

        const cart = findCart(cartId)

        if (!user) {
            throw new Error ('Usuario no encontrado')
        }

        if (!cart) {
            throw new Error ('Carro no encontrado')
        }

        user.cart = cart._id
        cart.userId = user._id
        await user.save()
        await cart.save()

        return user

    }   catch (error) {
        res.json({error})
    }
}

module.exports = {
    associateCartToUser,
    updateCart,
    findCart,
    }