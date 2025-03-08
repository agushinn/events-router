const { MongoClient } = require('mongodb')

let cachedDb = null

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb
    }
    const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@events-router.ggw2n.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(process.env.DATABASE_NAME)

    cachedDb = db
    return db
}

module.exports = { connectToDatabase }
