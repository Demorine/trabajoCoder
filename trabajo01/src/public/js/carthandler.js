document.getElementById('create-cart-btn').addEventListener('click', async () => {
    try {

        const userIdResponse = await fetch ('/api/users/obtain-user')
        const data = await userIdResponse.json()

        const createCartResponse = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const createCartData = await createCartResponse.json()

        
        const cartId = createCartData.cart._id
        const userId = data.userId

        const associateCartResponse = await fetch(`/api/cart/${userId}/associate-cart/${cartId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const associateCartData = await associateCartResponse.json()

        console.log('Carrito creado y asociado exitosamente:', associateCartData)
    } catch (error) {
        console.error('Error al crear o asociar el carrito:', error)
    }
})

async function addToCart(productId) {

    try {

        const cartIdResponse = await fetch ('/api/users/obtain-associated')
        const data = await cartIdResponse.json()

        const cartId = data.cartId._id

        const productData =
        {
            "products": [
                {
                    "_id": productId,
                    "quantity": 1
                }
            ]
        }

        const response = await fetch(`/api/cart/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: productData
        })

        if (response.ok) {
            console.log('Producto agregado al carrito')
        } else {
            console.log('Error al agregar el producto al carrito')
        }
    } catch (error) {
        console.error('Error:', error)

    }
}