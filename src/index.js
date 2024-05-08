const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const booksRouter = require('./routes/router')

const PORT = process.env.SERVER_PORT || 3003


// app.use(cors())

app.use(express.json())

app.use('/books', booksRouter)

app.get('/', (req, res) => {
   
})

app.listen(PORT, ()=> {console.log('Server Running on ' + PORT )})