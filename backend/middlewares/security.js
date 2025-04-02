const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// security with helmet
const securityMiddleware = helmet({
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

// Rate Limit Global
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later',
})

// Rate Limit Auth
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = { securityMiddleware, globalLimiter, authLimiter }
