const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')

//Get all
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getUsuario, (req, res) => {
    res.json(res.usuario)
})


//Post
router.post('/', async (req, res) => {
    const usuario = new Usuario({
        fullName: req.body.fullName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        phone: req.body.phone,
        signature: req.body.signature
    })
    try {
        const newUsuario = await usuario.save()
        res.status(201).json(newUsuario)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Update
router.patch('/:id', getUsuario, async (req, res) => {
    if (req.body.fullName != null) {
        res.usuario.fullName = req.body.fullName,
            res.usuario.birthDate = req.body.birthDate,
            res.usuario.email = req.body.email,
            res.usuario.phone = req.body.phone,
            res.usuario.signature = req.body.signature
    }
    try {
        const updatedUsuario = await res.usuario.save()
        res.json(updatedUsuario)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUsuario, async (req, res) => {
    try {
        await res.usuario.remove()
        res.json({ message: 'Usuario eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getUsuario(req, res, next) {
    let usuario
    try {
        usuario = await Usuario.findById(req.params.id)
        if (usuario == null) {
            return res.status(404).json({ message: 'Id de usuario no encontrado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.usuario = usuario
    next()
}

module.exports = router