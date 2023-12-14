const {Router} = require('express')
const router = Router()
const fs = require('fs')

const cartsFilePath = 'carrito.json'

router.get('/', (req, res) => {
    const carts = readCartsFile()
    res.json({carts})
})

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid
    const cart = readCartsFile().find(cart => cart.id === cartId)

    if (cart) {
        res.json({cart})
    } else {
        res.status(404).json({ error: 'carrito no encontrado'})
    }
})

router.post('/', (req, res) => {
    const newCart = {
        id: generateUniqueID(),
        products: [],
    }

    const carts = readCartsFile()
    carts.push(newCart)
    writeCartsFile(carts)

    res.json({ message: 'Carrito creado', cart: newCart})
})

router.post('/:cid/product/:pid', (req, res) => {
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

function readCartsFile() {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

function writeCartsFile(carts) {
    try {
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts,null, 2), 'utf8')
    } catch (error) {
        console.error('Error escribiendo archivo carrito', error)
    }
}

function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

module.exports = router