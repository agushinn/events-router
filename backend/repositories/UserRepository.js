// const { readData, writeData } = require('../utils/fileUtils')
// const UserFactory = require('../factory/UsersFactory')

// async function add(data, type = 'regular') {
//     const storedData = await readData()
//     const user = await UserFactory.createUser(data.email, data.password, type)

//     if (!storedData.users) {
//         storedData.users = []
//     }
//     storedData.users.push(user)
//     await writeData(storedData)

//     return user
// }

// async function get(email) {
//     console.log('get')
//     const storedData = await readData()
//     if (!storedData.users) {
//         return null
//     }

//     const user = storedData.users.find((ev) => ev.email === email)
//     if (!user) {
//         return null
//     }

//     return user
// }

// module.exports = {
//     add,
//     get,
// }

const { connectToDatabase } = require('../database/mongoConnection')
const UserFactory = require('../factory/UsersFactory')
const { NotFoundError } = require('../factory/ErrorsFactory')
const { ObjectId } = require('mongodb')
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
        console.log({ userDocument })
        if (!userDocument) {
            return null
        }
        return userDocument
    }

    // ??????
    // static async getById(userId) {
    //     const collection = await this.getCollection()
    //     const userDocument = await collection.findOne({ _id: userId })

    //     if (!userDocument) {
    //         throw new NotFoundError('User not found')
    //     }

    //     const { _id, ...userData } = userDocument
    //     return { id: _id, ...userData }
    // }
}

module.exports = UserRepository
