const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const authRoutes = require('./routes/AuthRoutes.js')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes.js')
const emailRoutes = require('./routes/EmailRoutes.js')

const app = express()

app.use(helmet())
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 mins
        max: 100, // limit each IP to 100 requests per windowMs
    })
)

app.use(express.json())
// app.use((req, res, next) => {
//     res.setHeader(
//         'Access-Control-Allow-Origin',
//         'https://events-router-client.vercel.app'
//     )
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET,POST,PUT,PATCH,DELETE,OPTIONS'
//     )
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     next()
// })

const allowedOrigins = [
    'https://events-router-client.vercel.app',
    'http://localhost:5173',
]
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('CORS not allowed'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/newsletters', newsletterRoutes)
app.use('/api/v1/emails', emailRoutes)

app.use((error, req, res, next) => {
    console.error(error)
    const status = error.status || 500
    const message = error.message || 'Something went wrong.'
    res.status(status).json({ message })
})

module.exports = app
