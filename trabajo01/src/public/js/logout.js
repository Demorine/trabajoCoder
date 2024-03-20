const logoutButton = document.getElementById('logout')

logoutButton.addEventListener('click', () => {
  console.log('logout')

    const url = '/api/auth/logout'
    const method = 'POST'

    fetch(url, {
        method
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login'
        } else {
            console.error('error al cerrar sesion')
        }
    })
    .catch(error => console.error('error: ', error))

})

