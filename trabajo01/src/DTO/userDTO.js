

class userDTO {
    constructor(user) {
        this.id = user.id
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.role = user.role
    }
}

module.exports = userDTO