const mongoose = require('mongoose')

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_APP_NAME,
    DATABASE_NAME,
} = require('../configs/configs')

const dbConnection = async () => {
    const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@events-router.ggw2n.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=${DATABASE_APP_NAME}`

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`✅ Connected to MongoDB: ${conn.connection.name}`)
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message)
        mongoose.disconnect()
        process.exit(1)
    }
}

module.exports = dbConnection
