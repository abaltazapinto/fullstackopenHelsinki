const express = require('express')
const app = express();

let notes = [
    {
        id: "1",
        content: "HTML is difficult",
        important: true
    },
    {
        id:"2",
        content: "Browser can execute only Javascript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    console.log(req.headers)
    res.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)     
}
    

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id);
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    const note = {
        content: body.content,
        important:Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
});

const PORT = 3004;
app.listen(PORT);
console.log(`Server running on port ${PORT} with the notes`)

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });