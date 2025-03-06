const { readData, writeData } = require('../utils/fileUtils')
const UserFactory = require('../factory/UsersFactory')

async function add(data, type = 'regular') {
    const storedData = await readData()
    const user = await UserFactory.createUser(data.email, data.password, type)

    if (!storedData.users) {
        storedData.users = []
    }
    storedData.users.push(user)
    await writeData(storedData)

    return user
}

async function get(email) {
    console.log('get')
    const storedData = await readData()
    if (!storedData.users) {
        return null
    }

    const user = storedData.users.find((ev) => ev.email === email)
    if (!user) {
        return null
    }

    return user
}

module.exports = {
    add,
    get,
}

// async function add(data) {
//     const storedData = await readData()
//     const userId = uuidv4()
//     const hashedPw = await hash(data.password, 12)
//     let isAdmin = false

//     if (!storedData.users) {
//         storedData.users = []
//     }

//     if (data.email === 'admin@admin.admin') {
//         isAdmin = true
//     }

//     storedData.users.push({
//         ...data,
//         password: hashedPw,
//         id: userId,
//         admin: isAdmin,
//     })
//     await writeData(storedData)
//     return { id: userId, email: data.email, admin: isAdmin }
// }
