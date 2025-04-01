const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación de email
        },
    },
    { timestamps: true } // Agrega createdAt y updatedAt automáticamente
)

const Newsletter = mongoose.model('Newsletter', newsletterSchema)

module.exports = Newsletter
