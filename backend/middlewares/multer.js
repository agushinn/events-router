const multer = require('multer')
const express = require('express')

const path = require('path')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },

    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const multerMiddleware = (app) => {
    app.use(
        multer({ storage: fileStorage, fileFilter: fileFilter }).single(
            'image',
        ),
    )

    app.use('/images', express.static(path.join(__dirname, '../images')))
}

module.exports = multerMiddleware
