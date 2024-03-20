document.getElementById('createCartBtn').addEventListener('click', async () => {
    try {
        const createCartResponse = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const createCartData = await createCartResponse.json()

        
        const cartId = createCartData.cart._id
        const userId = '{{ user._id }}'

        console.log(userId)
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