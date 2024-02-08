const bcrypt = require('bcrypt')
const { ReturnDocument } = require('mongodb')

const createHash = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

module.exports = {
    createHash,
    isValidPassword
}