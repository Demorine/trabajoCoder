import express from 'express'
import {ProductManager} from './productManager.js'

const app = express()
const port = 3000

const productManager = new ProductManager('productos.json')

app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const products = productManager.getProducts().slice(0, limit)
    res.json({ products })
})

app.get('/products/:pid', (req,res) => {
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductsById(productId)

    if (product) {
        res.json ({product})
    } else {
        res.status(404).json({error: 'Producto no encontrado'})
    }
})

app.listen(port, () => {
    console.log('Iniciado en http://localhost:${port}')
})