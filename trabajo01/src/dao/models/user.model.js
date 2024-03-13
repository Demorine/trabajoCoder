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
    age: {
        type: Number,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: Object.values(enumStatus),
        default: enumStatus.user
    },
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'cart'
    }
        
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User