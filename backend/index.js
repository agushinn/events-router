const express = require('express')
const dbConnection = require('./database/mongooseConnection')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

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

app.set('trust proxy', 1)

// Database Connection
dbConnection()

const openApiDocument = YAML.load(path.join(__dirname, 'swagger.yaml'))

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

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))
// app.use('/api-docs', swaggerUi.serve, async (req, res, next) => {
//     return res.send(swaggerUi.generateHTML(openApiDocument))
// })

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
        customCssUrl: 'https://unpkg.com/swagger-ui-dist@4/swagger-ui.css',
        customJs: [
            'https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js',
            'https://unpkg.com/swagger-ui-dist@4/swagger-ui-standalone-preset.js',
        ],
    }),
)

// Error handling
app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
