const mongoose = require('mongoose')
const {enumStatus} = require('../../db/mongo-roles')

const userCollection = 'user'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: Object.values(enumStatus),
        default: enumStatus.user
    }
        
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User