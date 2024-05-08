const {response, json} = require('express')
const bookshelfPool = require('../models/bookshelf')

const updateBook = async (req, res) => {
    const {id} = req.params
    const {body} = req

    if(!body.name) {
        return res.status(400).json({ 
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon isi nama buku ",
        });
    } 

    try {
        const pageCount = parseInt(body.pageCount)
        const readPage = parseInt(body.readPage)

        if(readPage > pageCount) {
            return res.status(400).json({
                status: "fail",
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            });
        }

        await bookshelfPool.updateBook(body, id)
        res.status(200).json({
            status: "success",
            message: 'Buku berhasil diperbarui',
        })
    } catch (error) {
        res.status(404).json({ 
            status: "fail",
            message: "GGagal memperbarui buku. Id tidak ditemukan",
            serverMessage: error
        })
    }

}

module.exports = {
    updateBook
}