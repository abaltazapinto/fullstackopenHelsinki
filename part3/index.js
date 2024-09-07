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

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT} with the notes`)

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });