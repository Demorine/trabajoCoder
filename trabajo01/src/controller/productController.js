const {Router} = require('express')
const { isEmptyObject } = require('jquery')
const ProductManager = require('../dao/manager/productManager.js')
const Product = require('../dao/models/product.model')

// const productManager = new ProductManager('productos.json')

const router = Router()

router.get('/', async (req, res) => {
    console.log('Inicio')
    try {
        
        const { limit = 10, page = 1, sort, query, category, available } = req.query

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            customLabels: { docs: 'payload' }
        }


        const findQuery = {}

        if (query) {
            findQuery.$or = [ 
                { title: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') } 
            ]
        }

        if (category) {
            findQuery.category = category
        }

        if (available !== undefined) {
            findQuery.available = available
        }

        const result = await Product.paginate(findQuery, options)

        res.render('products', {
            products: result.payload,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?limit=${limit}$page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/products?limit=${limit}$page=${result.nextPage}` : null
        })

    } catch(error) {
        res.json({error})
    }

    // Aca debajo tengo todos los GET del fs

    // const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    // const products = productManager.getProducts().slice(0, limit)
    // console.log(products)
    // res.json({ products })
    // res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) => {
    console.log('Inicio RT')
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const products = productManager.getProducts().slice(0, limit)
    // console.log(products)
    // res.json({ products })
    res.render('realTimeProducts', {products})
})

router.get('/:id', async (req,res) => {

    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ status: 'error', error: 'Producto no encontrado' })
        }

        res.render('productDetails', { product })
    } catch(error) {
        res.json({error})
    }


    // const productId = parseInt(req.params.id)
    // const product = productManager.getProductsById(productId)

    // if (product) {
    //     res.json ({product})
    // } else {
    //     res.status(404).json({error: 'Producto no encontrado'})
    // }
})

router.post('/', async (req, res) => {
    try {
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
    
        const newProductInfo = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || [],
        }

        const newProduct = await Product.create(newProductInfo)
        
        res.json({ message: 'Producto agregado', payload: newProduct})

    } catch(error) {
        res.json({error})
    }
    

    // productManager.addProduct(newProduct)
    
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        await Product.updateOne({ _id: id }, body)

        res.json({payload: 'Producto actualizado'})
    } catch(error) {
        res.json({error})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params

        await Product.deleteOne({ _id: id })

        res.json({payload: 'Producto eliminado'})
    } catch(error) {
        res.json({error})
    }

    // const productId = parseInt(req.params.pid)
    // productManager.deleteProduct(productId)
    // res.json({ message: 'Producto Eliminado'})
})

module.exports = router