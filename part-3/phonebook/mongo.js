// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://brunafinholdt:${password}@persons.nxkp9fh.mongodb.net/personApp?retryWrites=true&w=majority`

// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: String,
//   });

// const Person = mongoose.model('Person', personSchema)

// if (process.argv.length === 3) {
//     // If only password is provided, print all entries
//     Person.find({}).then((persons) => {
//       console.log('phonebook:');
//       persons.forEach((person) => {
//         console.log(`${person.name} ${person.number}`);
//       });
//       mongoose.connection.close();
//     });
//   } else if (process.argv.length === 5) {
//     // If all necessary arguments are provided, add an entry
//     const name = process.argv[3];
//     const number = process.argv[4];

//     const newPerson = new Person({
//       name,
//       number,
//     });

//     newPerson.save().then((result) => {
//         console.log(`Added ${name} number ${number} to phonebook`);
//         mongoose.connection.close();
//       });
//     } else {
//       console.log('Invalid number of arguments. Usage: node mongo.js <password> <name> <number>');
//       mongoose.connection.close();
//     }




