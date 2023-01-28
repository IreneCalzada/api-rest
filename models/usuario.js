const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)