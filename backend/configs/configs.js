require('dotenv').config()

const PORT = process.env.PORT || 8000
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_APP_NAME = process.env.DATABASE_APP_NAME
const DATABASE_NAME = process.env.DATABASE_NAME

module.exports = {
    PORT,
    JWT_SECRET_KEY,
    RESEND_API_KEY,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_APP_NAME,
    DATABASE_NAME,
}
