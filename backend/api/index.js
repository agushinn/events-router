const serverless = require('serverless-http')
const app = require('../app')

// backend/api/index.js
module.exports = (req, res) => {
    res.status(200).json({ message: 'Hello from serverless function!' })
}

// module.exports = serverless(app)
