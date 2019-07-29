// require('dotenv').config()  //remove after testing
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const url = process.env.MONGODB_URI
// console.log('url is ',url)
console.log("connecting to URI: ", url)

mongoose.connect(url, {useNewUrlParser: true})
.then(result => console.log('connected to MongoDB'))
.catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

personSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

//above seems to work
// testing below

// const Person = mongoose.model('Person', personSchema)

// 	Person.find({}).then(res => {
// 		console.log("phonebook:")
// 		res.forEach(person => {
// 			console.log(`${person.name} ${person.number}`)
// 		})
// 		mongoose.connection.close()	
// 	})


module.exports = mongoose.model('person', personSchema)