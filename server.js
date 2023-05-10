const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/api/notes', (req,res) => {
    res.status(200).json(`${req.method} request received`)

    console.info(`${req.method} request received`)
})

app.post('/api/notes', (req,res) => {
    console.into(`${req.method} request received`)

    const {noteTitle, noteText} = req.body

    if (noteTitle && noteText) {
    const newNote = {
        noteTitle,
        noteText
    }

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

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`))