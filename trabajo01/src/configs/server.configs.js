require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    mongopass: process.env.MONGO
}