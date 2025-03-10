const express = require('express')

const authRoutes = require('./routes/AuthRoutes.js')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes.js')
const emailRoutes = require('./routes/EmailRoutes.js')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://events-router-client.vercel.app'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use('/auth', authRoutes)
app.use('/events', eventRoutes)
app.use('/newsletters', newsletterRoutes)
app.use('/emails', emailRoutes)

app.use((error, req, res, next) => {
    console.error(error)
    const status = error.status || 500
    const message = error.message || 'Something went wrong.'
    res.status(status).json({ message })
})

module.exports = app
