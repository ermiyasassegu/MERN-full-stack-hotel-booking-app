require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('./controllers/authController')
const roomController = require('./controllers/roomController')
const uploadController = require('./controllers/uploadController')
const app = express()

//connnect db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () =>
  console.log('db is successfully connected')
)
//http://localhost:5000/images/FILENAMEHERE
//middlewares
//THIS TWO IS MUST IF YOU USE REQ.BODY
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/room', roomController)
app.use('/upload', uploadController)

const port = process.env.PORT || 5000
//start our server
app.listen(port, () => console.log('Server is running'))
