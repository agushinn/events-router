const { connectToDatabase } = require('../database/mongoConnection')
const UserFactory = require('../factory/UsersFactory')

class UserRepository {
    static async getCollection() {
        const db = await connectToDatabase()
        return db.collection('users')
    }

    static async add(data, type = 'REGULAR') {
        const collection = await this.getCollection()
        const user = await UserFactory.createUser(
            data.email,
            data.password,
            type
        )
        await collection.insertOne(user)

        return user
    }

    static async get(email) {
        const collection = await this.getCollection()
        const userDocument = await collection.findOne({ email })

        if (!userDocument) {
            return null
        }
        return userDocument
    }
}

module.exports = UserRepository
