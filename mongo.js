const mongoose = require('mongoose')
//cmd inputs 
// node mongo.js yourpassword Anna 040-1234556
// ******************************************** INPUT HANDLING START
const length = process.argv.length
let getAll = false
console.log(`length is ${length}`)
if(length === 3){ 
	//return all phonebook entries
	getAll = true
}
else if(length < 5) {
	console.log('usage: node mongo.js yourpassword name number')	
	process.exit(1)
}
// ******************************************** INPUT HANDLING END
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
if(getAll){
	// console.log('cannot get persons at the moment');
	Person.find({}).then(res => {
		res.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()	
	})
}