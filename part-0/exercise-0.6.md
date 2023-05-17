To create a new note, the user types somthing in the text field
The user submits the note by clicking the submit button
The server receives the POST request that contains the new note as JSON data containing both the content of the note and the timestamp
The event handler creates a new note, adds it to the notes list with teh command notes.push(note), rerenders the note list on the page and sends the new note to the server.
The server responds with status 201 created. The browser stays on the same page and it sends no further HTTP requests.

