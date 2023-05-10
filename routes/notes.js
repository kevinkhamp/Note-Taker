const notes = require('express').Router()
// const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')
const fs = require('fs')

// GET Route for db file
notes.get('/', async (req,res) => {
const readNotes = await JSON.parse(fs.readFileSync('./db/db.json'))
res.json(readNotes)
})

notes.post('/', (req,res) => {
    // console.log(req.body)

    const readNotes = JSON.parse(fs.readFileSync('./db/db.json'))

    const newNote = {
        title,
        text,
        note_id: uuid(),
    }

    readNotes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(readNotes))
    res.json(readNotes)
})

notes.delete('/:id', (req,res) => {
    const readNotes = fs.readFileSync('./db/db.json', 'utf8')
    const noteData = JSON.parse(readNotes)
    const newNotes = noteData.filter((note) => {
        return note.id !== req.params.id
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes))
    res.json("You finally deleted the note")
    })

module.exports = notes