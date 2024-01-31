const mongoose = require('mongoose')
const { mongopass } = require('../configs/server.configs')


const mongoConnect = async () => {
    try {
        await mongoose.connect(mongopass)
        console.log('db conectada.')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = mongoConnect