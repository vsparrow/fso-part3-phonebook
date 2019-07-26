const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

require('dotenv').config() 
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json());
morgan.token('bodydata', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodydata'));

// let persons = [
//     {
//         name: 'Arto Hellas',
//         number: '040-123456',
//         id: 1
//     },
//     {
//         name: 'Ada Lovelace',
//         number: '39-44-5323523',
//         id: 2
//     },
//     {
//         name: 'Dan Abramov',
//         number: '12-43-234345',
//         id: 3
//     },
//     {
//         name: 'Mary Poppendieck',
//         number: '39-23-6423122',
//         id: 4
//     },
//     {
//         name: 'Maz Jabroni',
//         number: '39-22-6457522',
//         id: 5
//     }
// ];

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
    //OLD WAY
	// const id = Number(req.params.id);
    // const person = persons.find(p => p.id === id);
    // if (person === undefined) {
    //     return res.status(400).json({ error: 'User id not found' });
    // }

    // console.log(id, person);
    // res.send(person);
	const id = req.params.id;
	console.log("id is ", id)
	Person.find({"_id": id})
	// .then(result => console.log(result))
	.then(result => { 
			const person = result[0]
			const found =  {"name": person.name, "number": person.number, "id": person._id}
			res.json(found)
		}
	)
	.catch(err => {
		console.log("User not found")
		// console.log(err.message)
		res.status(400).json({ error: 'User id not found' })
	})
}); //GET PERSON

app.get('/api/persons', (req, res) => {
	Person.find({})
	.then(result => {
		return result.map( person => { return {"name" : person.name, "number" : person.number, id: person.id }  } )
	})
	.then(map => res.json(map))
}); //GET PERSONS

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
	
	const person = new Person({
		name: req.body.name,
		number: req.body.number,
	})
	//make sure post is working then work on error handling
	// const isError = checkInput(person);
    // if (isError) {
    //     return res.status(400).json({ error: isError });
    // }

	person.save()
	.then(result => {
		console.log("Person saved!")
		console.log(result)
		return res.status(200).json({name: result.name, number: result.number, id: result.id})
	})
	.catch(error => {
		console.log(error.message)
		return res.status(400).json({ error: error.message });
	})
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
/* app.get('/', (req, res) => {				//not needed after import build
    res.send('<h1>Hello World</h1>');
});
	*/
// *****************************************************************************

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});