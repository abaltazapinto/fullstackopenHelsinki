const express = require('express');
const app = express();

let persons = [
    { id: 1, name: 'John Doe', "number": "040-123456" },
    { id: 2, name: 'Jane Doe', "number": "041-123456" },
    { id: 3, name: 'Alice Doe', "number": "042-123456" },
    { id: 4, name: 'Bob Doe', "number": "043-123456" }
]

// Middleware to parse JSON request bodies
app.use(express.json());

// Log each reques to the console
app.use((req,res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`) 
    next();
});

// GET all phones to the mponitor

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Phonebook</h1>') 
});

app.post('/api/persons', (req, res) => {
    const body = request.body;
    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
})

app.get('/api/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people </p><br/>
        <p>${date}</p>`)    
})

app.get('/api/persons/:id', (req, res) => {
    
    const person = persons.find(p => p.id === parseInt(req.params.id));
    console.log(`GET request for person with id: ${req.params.id}`);
    if(person) {
        res.json(person);
    } else {
        res.status(404).send('Person not found');
    }
})

// Delete a person by id
app.delete('api/persons/id', (req, res,) => {
    const id = Number(req.query.id);
    persons = persons.filter(p => p.id!== id);
    res.status(204).end();
});

const PORT = 3015;
app.listen(PORT);
console.log(`Server running on port ${PORT} with the notes`)
