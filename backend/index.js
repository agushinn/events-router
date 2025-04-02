const express = require('express')
const dbConnection = require('./database/mongooseConnection')

const {
    securityMiddleware,
    globalLimiter,
    authLimiter,
} = require('./middlewares/security')
const corsMiddleware = require('./middlewares/cors')
const {
    notFoundMiddleware,
    errorHandlerMiddleware,
} = require('./middlewares/errorHandler')
const swaggerMiddleware = require('./middlewares/swagger')

const authRoutes = require('./routes/AuthRoutes.js')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes.js')
const emailRoutes = require('./routes/EmailRoutes.js')

const app = express()

app.set('trust proxy', 1)

// Database Connection
dbConnection()

// Middlewares
app.use(securityMiddleware)
app.use(globalLimiter)
app.use(corsMiddleware)
app.use(express.json())

// Routes
app.use('/api/v1/auth', authLimiter, authRoutes)
app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/newsletters', newsletterRoutes)
app.use('/api/v1/emails', emailRoutes)

swaggerMiddleware(app)

// Error handling
app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
