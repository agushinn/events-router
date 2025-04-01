const { hash } = require('bcryptjs')
const { USER_TYPES } = require('../utils/userType')

class User {
    constructor(email, password, type) {
        this.id
        this.email = email
        this.password = password
        this.type = type.name
        this.roles = type.roles
    }
}

class RegularUser extends User {
    constructor(email, password) {
        super(email, password, USER_TYPES.REGULAR)
    }
}

class AdminUser extends User {
    constructor(email, password) {
        super(email, password, USER_TYPES.ADMIN)
    }
}
class UserFactory {
    static async createUser(email, password, type = USER_TYPES.REGULAR.name) {
        const hashedPassword = await hash(password, 12)

        switch (type) {
            case USER_TYPES.ADMIN.name:
                return new AdminUser(email, hashedPassword)
            case USER_TYPES.REGULAR.name:
            default:
                return new RegularUser(email, hashedPassword)
        }
    }
}

module.exports = UserFactory
