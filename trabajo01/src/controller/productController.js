const {Router} = require('express')
const ProductManager = require('./productManager.js')

const productManager = new ProductManager('productos.json')

const router = Router()

router.get('/', (req, res) => {
    console.log('Inicio')
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const products = productManager.getProducts().slice(0, limit)
    console.log(products)
    res.json({ products })
})

router.get('/:pid', (req,res) => {
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductsById(productId)

    if (product) {
        res.json ({product})
    } else {
        res.status(404).json({error: 'Producto no encontrado'})
    }
})

router.post('/', (req, res) => {
    const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    } = req.body

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'})
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
    }

    productManager.addProduct(newProduct)
    res.json({ message: 'Producto agregado', product: newProduct})
})

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid)
    productManager.deleteProduct(productId)
    res.json({ message: 'Producto Eliminado'})
})

module.exports = router