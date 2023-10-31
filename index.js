//we're importing express, which this time is a function that is used to create an express application stored in the app variable:
const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  //Next, we define two routes to the application. The first one defines an event handler that is used to handle HTTP GET requests made to the application's / root:

  //The event handler function accepts two parameters. The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.

  //In our code, the request is answered by using the send method of the response object. Calling the method makes the server respond to the HTTP request by sending a response containing the string <h1>Hello World!</h1> that was passed to the send method. Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html. The status code of the response defaults to 200.

  //We can verify this from the Network tab in developer tools:
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  //The second route defines an event handler that handles HTTP GET requests made to the notes path of the application:

  //The request is responded to with the json method of the response object. Calling the method will send the notes array that was passed to it as a JSON formatted string. Express automatically sets the Content-Type header with the appropriate value of application/json.

    //In the earlier version where we were only using Node, we had to transform the data into the JSON format with the JSON.stringify method:

    //response.end(JSON.stringify(notes))copy
    //With express, this is no longer required, because this transformation happens automatically.
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })