require('dotenv').config(); 

const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())

morgan.token('req-body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'));

// app.use(morgan('tiny'));

app.use(express.json())


  app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
      response.json(persons);
    });
  });


    app.get('/api/persons/:id', (request, response) => {
      Person.findById(request.params.id).then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
    })

    
  app.post('/api/persons', (request, response) => {
    const body = request.body

      const person = new Person({
        name: body.name,
        number: body.number,
      })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })