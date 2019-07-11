const express = require('express')
const app = express();

const persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    },
    { 
      "name": "Maz Jabroni", 
      "number": "39-22-6457522",
      "id": 5
    }
  ]
// *****************************************************************************
app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if(person === undefined) {return res.status(400).json({"error": "User id not found"})}
    
    console.log(id, person)
    res.send(person)
})

app.get('/api/persons', (req,res)=>{
    res.json(persons)
})
// *****************************************************************************
app.get('/info',(req,res)=>{
    const time = new Date()
    const peopleCount = persons.length
    let resString = `<h2>Phonebook has info for ${peopleCount} people</h2>`
    resString += `<h2>${time}<h2>`
    res.send(resString)
}) // info
// *****************************************************************************
app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})
// *****************************************************************************

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('Server listening on port ' + PORT)
})