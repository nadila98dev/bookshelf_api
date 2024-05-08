const {response, json} = require('express')
const bookshelfPool = require('../models/bookshelf')

const deleteBook = async (req, res) => {
    const {id} = req.params
    try {
        await bookshelfPool.deleteBook(id)
        res.status(200).json({
            status: "success",
            message: 'Buku berhasil dihapus'
        })
    } catch (error) {
        res.status(404).json({ 
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
            serverMessage: error
        })
    }
}

module.exports = {
    deleteBook
}