const notes = require('express').Router()
// const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')
const fs = require('fs')

// GET Route for db file
// Read method
notes.get('/', async (req,res) => {
    // Read the db.json and parse through it
const readNotes = await JSON.parse(fs.readFileSync('./db/db.json'))
res.json(readNotes)
})

// POST Route for db file
// Post method
notes.post('/', (req,res) => {
    // console.log(req.body)
    const readNotes = JSON.parse(fs.readFileSync('./db/db.json'))

    // Creating a new note
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuid(),
    }
    // Pushed the new not into the db.json
    readNotes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(readNotes))
    res.json(readNotes)
})

// I tried. Even YT tutorials can't get it to work for some reason :(
// Delete method
notes.delete('/:id', (req,res) => {
    // Create a value to hold db.json
    const readNotes = fs.readFileSync('./db/db.json', 'utf8')
    // Create another value to parse it
    const noteData = JSON.parse(readNotes)
    // Filter out the specific id
    const newNotes = noteData.filter((note) => {
        return note.id !== req.params.id
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes))
    res.json("You finally deleted the note")
    })

module.exports = notes