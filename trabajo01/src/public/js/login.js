const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const url = '/api/auth'
    const headers = {
        'Content-type': 'application/json'
    }
    const method = 'POST'
    const body = JSON.stringify(obj)

    fetch(url, {
        headers,
        method,
        body
    })
        .then(response => {
            if (response.ok) {
                window.location.href= '/api/products'
            } else {
                console.error('error al iniciar sesion')
            }
        })
        .catch(error => console.error(error))      
})