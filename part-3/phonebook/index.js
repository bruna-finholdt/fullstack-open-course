require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// Using build folder to serve frontend app
app.use(express.static('build'))
app.use(cors())

// Creating custom token to log request body to morgan console
morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'))
app.use(express.json())

// Get all persons from phonebook
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
})

// Information about how many people phonebook has registered and the current time
app.get('/info', (request, response) => {
  Person.find({})
    .then((persons) => {
      const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
      response.send(info)
    })
    .catch((err) => {
      response.status(400).json({
        error: err,
        message: 'could not fetch data from server',
      })
    })
})

// Get Person by ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete Person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Generates a random id for the POST body
// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

// Edit Person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  // const person = {
  //   name: body.name,
  //   number: body.number,
  // }

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})