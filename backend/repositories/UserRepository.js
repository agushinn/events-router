const { User } = require('../models/user')
const { USER_TYPES } = require('../utils/userType')
const UserFactory = require('../factory/UsersFactory')

class UserRepository {
    static async add(data, type = USER_TYPES.REGULAR.name) {
        const user = await UserFactory.createUser(
            data.email,
            data.password,
            type
        )

        const createdUser = await User.create(user)
        return createdUser
    }

    static async get(email) {
        const user = await User.findOne({ email })
        return user || null
    }
}

module.exports = UserRepository
