const mongoose = require('mongoose')


const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://maximilianocortez789:GlcYRfLNAVNQ6BH1@ecommerce.fdmhsgy.mongodb.net/50000?retryWrites=true&w=majority')
        console.log('db conectada.')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = mongoConnect