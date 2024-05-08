const {response, json} = require('express')
const bookshelfPool = require('../models/bookshelf')

const getAllBooks = async (req, res) => {
    try{
        const allBooks = await bookshelfPool.getAllBookShelf()

        res.status(200).json({
            status: 'success',
            data: allBooks
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        })
    }
}

const getBookbydId = async (req, res) => {
    const {id} = req.params
    try {
        const [rows, fields] = await bookshelfPool.getBookbyId(id)
        if (rows.length > 0 ) {
            res.status(200).json({
                status: "success",
                message: 'Buku ditemukan',
                data: rows[0]
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: 'Buku tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: 'Server error',
            serverMessage: error.message
        })
    }
}

const getBooksbyName = async (req, res) => {
    try {
        const {name} = req.query
        if(!name) {
            return res.status(400).json({
                status: "fail",
                message: 'Parameter "name" is required in the query string'
            })
        }
        const books = await bookshelfPool.getBooksbyName(name)
        res.status(200).json({
            status: "success",
            data: books
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: 'Server error',
            serverMessage: error.message
        })
    }
}

const getBookbyFilter = async (req, res) => {
    const { finished } = req.query

    finished = parseInt(finished)
    console.log('Pared finished value: ', finished )

    try {
        const [rows, fields] = await bookshelfPool.getBookbyFinished(finished)

        console.log('Database query result:', rows);
        
        if (rows.length > 0) {
            res.status(200).json({
                status: "success",
                message: 'Books found',
                data: rows
            });
        } else {
            res.status(404).json({
                status: "fail",
                message: 'No books found for the provided filter'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: 'Server error',
            serverMessage: error.message
        })
    }
};


      

module.exports = {
    getAllBooks,
    getBookbydId,
    getBooksbyName,
    getBookbyFilter
}