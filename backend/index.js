const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const authRoutes = require('./routes/AuthRoutes.js')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes.js')
const emailRoutes = require('./routes/EmailRoutes.js')

const app = express()

// 1. Basic Security with Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https://*.vercel.app'],
            },
        },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
)

// 2. Rate Limiting global
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later',
})
app.use(globalLimiter)

// 3. CORS
const allowedOrigins = ['https://events-router-client.vercel.app']

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

// 4. Rate Limiting specific for auth
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 tries
    message: 'Too many login attempts, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
})

// 5. Body Parser
app.use(express.json())

// 6. Routes
app.use('/api/v1/auth', authLimiter, authRoutes)
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
