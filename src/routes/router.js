const express = require('express')

const bookRead = require('../controller/read')
const bookCreates = require('../controller/create')
const bookUpdates = require('../controller/update')
const booksDeletes = require('../controller/delete')

const router = express.Router()

router.get('/allbooks', bookRead.getAllBooks)

router.get('/:id', bookRead.getBookbydId)

router.get('/:name', bookRead.getBooksbyName)

router.get('/:finished', bookRead.getBookbyFilter)

router.post('/create', bookCreates.createBook)

router.patch('/:id', bookUpdates.updateBook)

router.delete('/:id', booksDeletes.deleteBook)

module.exports = router