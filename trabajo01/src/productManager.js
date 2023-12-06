import fs from 'fs'

export class ProductManager {

    constructor(filePath) {
        this.path = filePath
        this.product = []
        this.id = 1

        this.loadProducts()
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            this.product = JSON.parse(data)
        } catch (error) {
            this.saveProduct()
        }
    }

    saveProduct() {
        const data = JSON.stringify(this.product, null, 2)
        fs.writeFileSync(this.path, data, 'utf8')
    }

    addProduct(product) {

            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {

                console.error('No tienes todos los campos obligatorios.')
                return

            }

            if (this.product.some(existingProduct => existingProduct.code === product.code)) {

                console.error('Ya existe un producto con este codigo.')
                return

            }

            const newProduct = {

                id: this.id++,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock

            }

        this.product.push(newProduct)

        this.saveProduct()

    }

    getProducts() {

        return this.product

    }

    getProductsById(id) {

        const product = this.product.find(existingProduct => existingProduct.id === id)

        if (product) {
            console.log(product)
            return product
        } else {
            console.error('Producto no encontrado')
            return null
        }

    }

    updateProduct(id, updatedProduct) {
        const index = this.product.findIndex(existingProduct => existingProduct.id === id)
        if (index !== -1) {
            updatedProduct.id = this.product[index].id
            this.product[index] = updatedProduct
            this.saveProduct()
            console.log('Producto actualizado')
        } else {
            console.error('Producto no encontrado')
        }
    }

    deleteProduct(id) {
        const index = this.product.findIndex(existingProduct => existingProduct.id === id)
        if (index !== -1) {
            this.product.splice(index, 1)
            this.saveProduct()
            console.log('Producto Eliminado')
        } else {
            console.error('Producto no encontrado')
        }
    }

}

// const productManager = new ProductManager('productos.json')


// console.log('Get Product Vacio')
// console.log(productManager.getProducts())
// console.log(' ')

// console.log('Producto agregado')
// productManager.addProduct({
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin Imagen",
//     code: "abc123",
//     stock: 25
// })
// console.log(' ')

// console.log('Primer producto en el get')
// console.log(productManager.getProducts())
// console.log(' ')

// console.log('Llamar getProductById (id: 1)')
// productManager.getProductsById(1)
// console.log(' ')

// console.log('Llamar a updateProduct')
// productManager.updateProduct(1, {
//     title: "producto prueba Modificado",
//     description: "descripcion modificada",
//     price: 400,
//     thumbnail: "Sin Imagen",
//     code: "abc123",
//     stock: 50
// })
// console.log(' ')

// console.log('Get product con producto actualizado')
// console.log(productManager.getProducts())
// console.log(' ')

// console.log('Llamando a deleteProduct (id: 1)')
// productManager.deleteProduct(1)
// console.log(' ')

// console.log('Llamando a deleteProduct sin que exista un producto')
// productManager.deleteProduct(1)
// console.log(' ')

// console.log('Llamando a get despues de borrar un producto')
// console.log(productManager.getProducts())