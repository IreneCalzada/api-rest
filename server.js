require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

app.use(express.json())
app.use(cors());

const usuariosRoute = require('./routes/usuarios')
app.use('/usuarios', usuariosRoute)
app.listen(3000, () => console.log('Server Started'))