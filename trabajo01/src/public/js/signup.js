const form = document.getElementById('signupForm')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value,key) => obj[key] = value)

    const url = '/api/users'
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
                window.location.href = 'login'
            } else {
                console.error('error al registrarse')
            }
        })
        .catch(error => console.error('error: ', error))
})