const mongoose = require('mongoose')
const { USER_TYPES, USER_ROLES } = require('../utils/userType')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        type: {
            type: String,
            enum: [USER_TYPES.REGULAR.name, USER_TYPES.ADMIN.name],
            required: true,
        },
        roles: {
            type: [String],
            enum: Object.values(USER_ROLES),
            required: true,
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User }
