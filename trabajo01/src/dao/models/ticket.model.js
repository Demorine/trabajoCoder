const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: uuidv4,
        unique: true
    },
    purchase_datetime:{
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
        
})

const Ticket = mongoose.model(ticketCollection, ticketSchema)

module.exports = Ticket