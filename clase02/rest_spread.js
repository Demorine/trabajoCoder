const mate = {
    name: 'mate',
    age: 4,
    country: 'col',
}

const newUser = {
    ...mate,
    role: 'admin',
}

//newUser.role = 'admin'
console.log("TCL: newUser", mate)
console.log("TCL: newUser", newUser)

const result = (...numbers) => {
    console.log(numbers.reduce((prev, curr) => prev + curr))
}

result(1, 2, 3, 4, 5, 6, 7)