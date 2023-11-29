people = [
    {id: 1, name: "Maxi", isStudent: true},
    {id: 2, name: "Juan", isStudent: false},
    {id: 3, name: "Ara", isStudent: false}
]

person = people.find(p => p.id === 1)

console.log(person) 

// las const no son modificables, pero en Arrays se le puede agregar datos con unshift, push o quitar con shift y pop.
// si estan en un object se le puede editar el contenido de una variable dentro de este.

