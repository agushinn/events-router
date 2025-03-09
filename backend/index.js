// const express = require('express')
// require('dotenv').config()

// // const authRoutes = require('../backend/routes/AuthRoutes')
// const eventRoutes = require('../backend/routes/EventRoutes')
// // const newsletterRoutes = require('../backend/routes/NewsletterRoutes')
// // const emailRoutes = require('../backend/routes/EmailRoutes')

// const app = express()

// app.use(express.json())

// app.use((req, res, next) => {
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET,POST,PUT,PATCH,DELETE,OPTIONS'
//     )
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     next()
// })

// // app.use('/auth', authRoutes)
// app.use('/events', eventRoutes)
// // app.use('/newsletters', newsletterRoutes)
// // app.use('/emails', emailRoutes)
// app.get('/test', (req, res) => {
//     res.json({ message: 'Funciona!' })
// })

// app.use((error, req, res, next) => {
//     const status = error.status || 500
//     const message = error.message || 'Something went wrong.'
//     res.status(status).json({ message })
// })

// // app.listen(8080, () => {
// //     console.log(`Server is running on 8080  - MVC`)
// // })

// module.exports = app

//funcionando en vercel
const express = require('express')

const authRoutes = require('./routes/AuthRoutes')
const eventRoutes = require('./routes/EventRoutes.js')
const newsletterRoutes = require('./routes/NewsletterRoutes')
const emailRoutes = require('./routes/EmailRoutes')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin'
        // 'https://events-router-client.vercel.app/'
    )
    res.setHeader('Access-Control-Allow-Origin', '*')
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
app.get('/test', (req, res) => {
    res.json({ message: 'Funciona!' })
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || 'Something went wrong.'
    res.status(status).json({ message })
})

// app.listen(8080, () => {
//     console.log(`Server is running on 8080  - MVC`)
// })

module.exports = app
