const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
    },
    { timestamps: true }
)

const Newsletter = mongoose.model('Newsletter', newsletterSchema)

module.exports = Newsletter
