const { hash } = require('bcryptjs')

const USER_ROLES = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    CONTROL_PANEL: 'CONTROL_PANEL',
}

const USER_TYPES = {
    REGULAR: {
        name: 'REGULAR',
        roles: [
            USER_ROLES.CREATE,
            USER_ROLES.READ,
            USER_ROLES.UPDATE,
            USER_ROLES.DELETE,
        ],
    },
    ADMIN: {
        name: 'ADMIN',
        roles: [
            USER_ROLES.CREATE,
            USER_ROLES.READ,
            USER_ROLES.UPDATE,
            USER_ROLES.DELETE,
            USER_ROLES.CONTROL_PANEL,
        ],
    },
}
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
