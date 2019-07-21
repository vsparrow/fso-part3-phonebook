const mongoose = require('mongoose')
// ******************************************** INPUT HANDLING 
const length = process.argv.length
let getAll = false
if(length === 3){ 	//return all phonebook entries
	getAll = true
}
else if(length < 5) {
	console.log('usage: node mongo.js yourpassword name number')	
	process.exit(1)
}

// ******************************************** CONNNECT TO DB START
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-mzgxn.mongodb.net/persons-app?retryWrites=true&w=majority
`
mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)
// ******************************************** ADD PERSON
if(!getAll){
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(res => {
		console.log('person saved!')
		mongoose.connection.close()
	})
}
// ******************************************** GET PERSONS
if(getAll){
	Person.find({}).then(res => {
		res.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()	
	})
}