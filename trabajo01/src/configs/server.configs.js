require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    mongopass: process.env.MONGO,
    secretKey: process.env.SECRET,
    GH_Client_ID: process.env.GH_CLIENT_ID,
    GH_Client_Secret: process.env.GH_CLIENT_SECRET
}