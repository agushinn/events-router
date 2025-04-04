const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        image: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            nullable: true,
            required: false,
        },
        imageMode: {
            type: String,
            enum: ['url', 'file'],
            required: true,
        },
    },
    { timestamps: true },
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
