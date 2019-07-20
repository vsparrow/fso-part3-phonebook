const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json());
morgan.token('bodydata', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodydata'));

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    },
    {
        name: 'Maz Jabroni',
        number: '39-22-6457522',
        id: 5
    }
];

const generateId = () => {
    const id = Math.floor(Math.random() * Math.floor(100));
    if (persons.some(p => p.id === id)) {
        return generateId();
    }
    return id;
};

//input is an object
const checkInput = input => {
    // The name or number is missing
    if (!input.name || input.name.length === 0) {
        return 'Api requires a name';
    }
    if (!input.number || input.number.length === 0) {
        return 'Api requires a number';
    }
    // The name already exists in the phonebook
    if (persons.some(p => p.name === input.name)) {
        return 'name must be unique';
    }
    //input was valid
    return null;
};

// *****************************************************************************
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person === undefined) {
        return res.status(400).json({ error: 'User id not found' });
    }

    console.log(id, person);
    res.send(person);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    console.log(persons);
    res.json({});
});

app.put('/api/persons/:id', (req, res) => {      //only setup to update number
    const id = Number(req.params.id);
	const idx = persons.findIndex(p => p.id === id)
	const person = persons[idx]
	// console.log("idx is", idx)
	// console.log("person is", person)
	// console.log("req.body.number is ", req.body.number)
	
	if (person === undefined) {
        return res.status(400).json({ error: 'User id not found' });
    }
	if(!req.body.number || req.body.number.length === 0) {
	     return res.status(400).json({ error: 'Number must be one digit or greater' });
	}
	persons[idx].number = req.body.number
	res.json(persons[idx])		//return person to poster
});

app.post('/api/persons', (req, res) => {
    const id = generateId();

    // const person = {name: req.body.name, number: req.body.number,  id: id}
    const person = { name: req.body.name, number: req.body.number };
    const isError = checkInput(person);
    if (isError) {
        return res.status(400).json({ error: isError });
    }

    person.id = id;
    persons.push(person);
    // console.log(id, req.body, req.body.name, req.body.number)
    // console.log(person)
    // console.log(persons)
    // res.json({"id":id})
    res.json(person);
});
// *****************************************************************************
app.get('/info', (req, res) => {
    const time = new Date();
    const peopleCount = persons.length;
    let resString = `<h2>Phonebook has info for ${peopleCount} people</h2>`;
    resString += `<h2>${time}<h2>`;
    res.send(resString);
}); // info
// *****************************************************************************
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});
// *****************************************************************************

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});