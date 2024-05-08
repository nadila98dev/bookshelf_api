const { nanoid } = require('nanoid')
const dbPool = require('../config/database')

// To display all the books
const getAllBookShelf = async () => {
    const SQLQuery = 'SELECT id, name, publisher FROM bookshelf'
    const [rows, fields] = await dbPool.execute(SQLQuery)
    return rows
}

const getBookbyId = async (id) => {

    const SQLQuery = `SELECT * 
                        FROM bookshelf
                        WHERE id = ?`
    return await dbPool.execute(SQLQuery, [id])

}

const getBooksbyName = async (name) => {
    const SQLQuery = `SELECT id, name, publisher  
                      FROM bookshelf 
                      WHERE LOWER(name) LIKE LOWER(?)`
    const searchName = `%${name.toLowerCase()}%`
    return await dbPool.execute(SQLQuery, [searchName])
}

const getBookbyFinished = async (finished) => {
    const SQLQuery = 'SELECT * FROM bookshelf WHERE finished = ?'
    return await dbPool.execute(SQLQuery, [finished])
}

const createNewBook = async (body) => {
    const id = nanoid(16)
    const insertedAt = new Date().toISOString().replace('T', ' ').replace('Z', '')
    const updatedAt = insertedAt
    const finished = body.pageCount ===body.readPage ? 1 : 0

    const SQLQuery = `INSERT INTO bookshelf (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [id, body.name, body.year, body.author, body.summary, body.publisher, body.pageCount, body.readPage, finished, body.reading,  insertedAt, updatedAt]
    await dbPool.execute(SQLQuery, values)
    return {
        id,
        ...body
    }
}

const updateBook = async (body, id) => {
    const fieldToUpdate = []
    const updatedAt = new Date().toISOString().replace('T', ' ').replace('Z', '')
    const finished = body.pageCount === body.readPage ? 1 : 0
    
    for (const [key, value] of Object.entries(body)) {
        fieldToUpdate.push(`${key} = '${value}'`)
    }
    const SQLQuery = `UPDATE bookshelf 
    SET ${fieldToUpdate.join(', ')}
    WHERE id = '${id}'`
    return await dbPool.execute(SQLQuery)
}

const deleteBook = async (id) => {
    const SQLQuery = `DELETE FROM bookshelf WHERE id=${id}`
    return await dbPool.execute(SQLQuery)
}

module.exports = {
    getAllBookShelf,
    getBookbyId,
    getBooksbyName,
    getBookbyFinished,
    createNewBook,
    updateBook,
    deleteBook
}
