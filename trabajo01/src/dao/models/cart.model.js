const mongoose = require('mongoose')

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    products: String
})

const Cart = mongoose.model(cartCollection, cartSchema)

module.exports = Cart