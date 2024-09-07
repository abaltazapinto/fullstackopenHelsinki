const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body')

const app = express();
morganBody(app);

let persons = [
    { id: 1, name: 'John Doe', "number": "040-123456" },
    { id: 2, name: 'Jane Doe', "number": "041-123456" },
    { id: 3, name: 'Alice Doe', "number": "042-123456" },
    { id: 4, name: 'Bob Doe', "number": "043-123456" }
]

// Middleware to parse JSON request bodies
app.use(express.json());

// Custom token to log POST body data
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

//morgan
app.use(morgan('tiny'));


// Use morgan with the new 'body' token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// Log each reques to the console
app.use((req,res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`) 
    next();
});

// GET all phones to the mponitor

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Phonebook</h1>') 
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body)

    // if (!body.name || !body.number) {
    //     return res.status(400).json({
    //         error: 'Name or number missing'
    //     })
    // }

    const nameExists = persons.some(person => person.name === body.name);
    console.log("name exists",nameExists)
    if (nameExists) {
        return res.status(400).json({
            error: 'Name must be unique'
        });
    }

    const numberExists = persons.some(person => person.number === body.number);
    console.log("number exists",numberExists)
    if (numberExists) {
        return res.status(400).json({
            error: 'Number must be unique'
        });
    }

    //create a new person
    const newPerson = {
        id: Math.max(...persons.map(person => person.id)) + 1, // Generate a new ID
        name: body.name,
        number: body.number
      };

    persons = persons.concat(newPerson)

    res.json(newPerson)
});

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people </p><br/>
        <p>${date}</p>`)    
})

app.get('/api/persons/:id', (req, res) => {
    
    const person = persons.find(p => p.id === parseInt(req.params.id));
    console.log(`GET req for person with id: ${req.params.id}`);
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
console.log(`Server running on port ${PORT} with the persons, exercise 3.7 to 3.8`)
