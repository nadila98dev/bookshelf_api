const { response, json } = require('express');
const bookshelfPool = require('../models/bookshelf');

const createBook = async (req, res) => {
    const { body } = req;

    if(!body.name) {
        return res.status(400).json({ 
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku ",
        });
    }

    try {
        // Check if pageCount and readPage are valid numbers
        const pageCount = parseInt(body.pageCount);
        const readPage = parseInt(body.readPage);

       

        if (readPage > pageCount) {
            // if readPage is greater than pageCount, send error response
            return res.status(400).json({
                status: "fail",
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            });
        }

        const createdBook = await bookshelfPool.createNewBook(body);
        return res.status(201).json({
            status: "success",
            message: 'Buku berhasil ditambahkan',
            data: {
                bookdId: createdBook.id
            }
        });
    } catch (error) {
       return res.status(400).json({ 
            status: "fail",
            message: 'Gagal menambahkan buku. Terjadi kesalahan pada server.',
            serverMessage: error.message 
        });
    }
};

module.exports = { createBook };
