const notes = require('express').Router()
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')

// GET Route for db file
notes.get('/', (req,res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

notes.post('', (req,res) => {
    console.into(`${req.method} request received`)

    const {noteTitle, noteText} = req.body

    if (noteTitle && noteText) {
    const newNote = {
        noteTitle,
        noteText,
        noteID: uuid(),
    }

    readAndAppend(newNote, './db/db.json')

    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedNote = JSON.parse(data)
            parsedNote.push(newNote)

            fs.writeFile('./db/db.json', JSON.stringify(parsedNote), (writeErr) =>
            writeErr ? console.error(writeErr) : console.info('Note saved!')
            )
        }
    })

        const response = {
            status: 'success',
            body: newNote,
        }

        console.log(response)
        res.status(201).json(response)
    } else {
        res.status(500).json('Error in posting note')
    }
})

app.delete('/api/notes', (req,res) => {
    console.info(`${req.method} request received`)
    res.send('Deleted')
})
