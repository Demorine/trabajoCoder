const {Router} = require('express')
const router = Router()
const fs = require('fs')
const Cart = require('../dao/models/cart.model')
const cartManager = require('../dao/manager/cartManager')
const { updateCart } = require('../dao/manager/cartManager')
const { createTicketFromCart } = require('../dao/manager/ticketManager.js')
const cartsFilePath = 'carrito.json'

router.get('/', (req, res) => {
    const carts = readCartsFile()
    res.json({carts})
})

router.get('/:cid', async (req, res) => {

    try {
        const { cid } = req.params

        const cart = await Cart.findById(cid).populate('products.product')

        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carro no encontrado'})
        }

        res.render('cart', { products: cart.products })
    } catch(error) {
        res.json({error})
    }

    // fs
    // const cartId = req.params.cid
    // const cart = readCartsFile().find(cart => cart.id === cartId)

    // if (cart) {
    //     res.json({cart})
    // } else {
    //     res.status(404).json({ error: 'carrito no encontrado'})
    // }
})

router.post('/', async (req, res) => {

    try {

        const newCart = new Cart()
        const savedCart = await newCart.save()

        res.status(201).json({ status: 'success', cart: savedCart })

    } catch(error) {
        res.json({error})
    } 

    // funcion fs
    // const newCart = {
    //     id: generateUniqueID(),
    //     products: [],
    // }

    // const carts = readCartsFile()
    // carts.push(newCart)
    // writeCartsFile(carts)

    // res.json({ message: 'Carrito creado', cart: newCart})
})

router.post('/:cid/products', async (req,res) => {
    try {
        const { cid } = req.params
        const { productId, quantity } = req.body

        const cart = await Cart.findById(cid)

        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Carro no encontrado'})
        }

        const existingProduct = cart.products.find((p) => p.product === productId)

        if (existingProduct) {

            existingProduct.quantity += quantity || 1

        } else {

            cart.products.push({ product: productId, quantity: quantity || 1})

        }

        const savedCart = await cart.save()

        res.json({ status: 'success', cart: savedCart })

    } catch(error) {
        console.log(error)
        res.json({error})

    }
}) 

router.post('/:cid/products/:pid', (req, res) => {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid)
    const quantity = req.body.quantity || 1

    const carts = readCartsFile()
    const cartIndex = carts.findIndex(cart => cart.id === cartId)

    if (cartIndex !== -1) {
        const existingProductIndex = carts[cartIndex].products.findIndex(product => product.id === productId)

        if(existingProductIndex !== -1) {
            carts[cartIndex].products[existingProductIndex].quantity += quantity
        } else {
            carts[cartIndex].products.push({ id: productId, quantity})
        }
    } else {
        res.status(404).json({ error: 'Carrito no encontrado'})
    }
})

router.put('/:cid', updateCart)

router.delete('/:cid/products/:pid', async(req, res) => {
    try {
        const { cid, pid } = req.params

        const cart = await Cart.findById(cid)

        if (!cart) {

            return res.status(404).json({ status: 'error', error: 'carrito no encontrado'})

        }

        cart.products = cart.products.filter((p) => !p.product === pid)

        const savedCart = await cart.save()

        res.json({ status: 'success', cart: savedCart})
    } catch(error) {
        res.json({error})
    }
})

router.delete('/:cid', async(req, res) => {
    try {
        const { cid } = req.params

        const cart = await Cart.findById(cid)

        if (!cart) {

            return res.status(404).json({ status: 'error', error: 'carrito no encontrado'})

        }

        cart.products = []

        const savedCart = await cart.save() 

        res.json({ status: 'success', cart: savedCart})
    } catch(error) {
        res.json({error})
    }
})

router.patch('/:uid/associate-cart/:cid', async (req, res) => {
    const { uid, cid } = req.params

    try {
        const user = await cartManager.associateCartToUser(uid, cid)
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.json({error})
    }

})

router.post('/:cid/purchase', async (req, res) => {

    const { cid } = req.params

    try {
        const ticket = await createTicketFromCart(cid)
        res.status(200).json({ success: true, ticket})
    } catch (error) {
        res.json({error})
    }
})



// function readCartsFile() {
//     try {
//         const data = fs.readFileSync(cartsFilePath, 'utf8')
//         return JSON.parse(data)
//     } catch (error) {
//         return [];
//     }
// }

// function writeCartsFile(carts) {
//     try {
//         fs.writeFileSync(cartsFilePath, JSON.stringify(carts,null, 2), 'utf8')
//     } catch (error) {
//         console.error('Error escribiendo archivo carrito', error)
//     }
// }

// function generateUniqueID() {
//     return Date.now().toString(36) + Math.random().toString(36).substring(2)
// }

module.exports = router