const string = '           ola coders     '
console.log("TCL: string", string.trim())

const numbers = [

    1,
    2,
    3,
    4,
    ['4.1','4.2','4.3'],
    5,
    6,
    ['6.1',['6.1.1'], '6.2'],
    7,
]

const newNumbers = numbers.flat(2)
console.log("TCL: numbers", numbers)
console.log("TCL: numbers", newNumbers)