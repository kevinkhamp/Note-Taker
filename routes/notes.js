const notes = require('express').Router()
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')

// GET Route for db file
notes.get('/', (req,res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

notes.post('/', (req,res) => {

    const {noteTitle, noteText} = req.body

    if (noteTitle && noteText) {
    const newNote = {
        noteTitle,
        noteText,
        noteID: uuid(),
    }

    readAndAppend(newNote, './db/db.json')

    const response = {
            status: 'success',
            body: newNote,
        }

        res.json(response)
    } else {
        res.json('Error in posting note')
    }
})

notes.delete('/', (req,res) => {
    console.info(`${req.method} request received`)
    res.send('Deleted')
})

module.exports = notes