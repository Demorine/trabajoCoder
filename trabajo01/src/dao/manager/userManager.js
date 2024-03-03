const User = require('../models/user.model')

async function findUserByID(id) {
    return User.findOne({_id: id})
}

async function findUser(username) {

    return User.findOne({email: username})

}

async function createUser(newUserInfo) {

    return User.create(newUserInfo)
}

module.exports = {
    findUser,
    createUser,
    findUserByID,
}