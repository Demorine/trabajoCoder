class ProductManager {
    #product = []
    #id = 1

    addProduct(

        title,
        description,
        price,
        thumbnail,
        code,
        stock

        ) {

            if (!title || !description || !price || !thumbnail || !code || !stock) {

                console.error('No tienes todos los campos obligatorios.')
                return

            }

            if (this.#product.some(product => product.code === code)) {

                console.error('Ya existe un producto con este codigo.')
                return

            }

            const newProduct = {

                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock

            }

        this.#product.push(newProduct)

    }

    getProducts() {

        return this.#product

    }

    getProductsById(id) {

        const product = this.#product.find(product => product.id === id)

        if (product) {
            return product
        } else {
            console.error('Producto no encontrado')
            return null
        }

    }

}

const productManager = new ProductManager()

const returnProducts = productManager.getProducts()

console.log(returnProducts)
productManager.addProduct('producto prueba','este es un producto prueba',200,'sin imagen','abc123',25)
console.log(returnProducts)