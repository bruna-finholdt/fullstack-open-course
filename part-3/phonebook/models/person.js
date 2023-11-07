const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    // minlength: 8,
    required: true,
    validate: {
      validator: function(value) {
        const parts = value.split('-')
        if (parts.length === 2) {
          const firstPart = parts[0]
          const secondPart = parts[1]
          return firstPart.length >= 2 && firstPart.length <= 3 && (firstPart.length + secondPart.length) >= 8
        }
        return false
      },
      message: 'Phone number must have the format xx-xxxxxx or xxx-xxxxx'
    }
  },
})

// Formatting the response
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)