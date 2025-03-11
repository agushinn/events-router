const { MongoClient } = require('mongodb')
const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_APP_NAME,
    DATABASE_NAME,
} = require('../configs/configs')

let cachedDb = null

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb
    }
    const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@events-router.ggw2n.mongodb.net/?retryWrites=true&w=majority&appName=${DATABASE_APP_NAME}`
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(DATABASE_NAME)

    cachedDb = db
    return db
}

module.exports = { connectToDatabase }
