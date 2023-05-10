const notes = require('express').Router()
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')
const db = require('../db/db.json')

// GET Route for db file
notes.get('/', (req,res) => {
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req,res) => {
    console.log(req.body)

    const {title, text} = req.body

    if (req.body) {
    const newNote = {
        title,
        text,
        note_id: uuid(),
    }

    readAndAppend(newNote, './db/db.json')
    res.json('Note added')
    } else {
        res.error('Error in adding note')
    }
})

// notes.delete('/:id', (req,res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

//     const newNotes = dataJSON.filter((note) => {
//         return note.id !== req.params.id
//     })

//     readAndAppend('./db/db.json', JSON.stringify(newNotes), (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     })
//     res.json('Note deleted')
//     })

module.exports = notes