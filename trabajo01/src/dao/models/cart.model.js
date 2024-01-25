const mongoose = require('mongoose')

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        default: []
    }
})

const Cart = mongoose.model(cartCollection, cartSchema)

module.exports = Cart