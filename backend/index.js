const express = require('express')
const dbConnection = require('./database/mongooseConnection')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')

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

const authRoutes = require('./routes/AuthRoutes.js')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes.js')
const emailRoutes = require('./routes/EmailRoutes.js')

const app = express()

// Database Connection
dbConnection()

const openApiDocument = YAML.load('./swagger.yaml')

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))

// Error handling
app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
