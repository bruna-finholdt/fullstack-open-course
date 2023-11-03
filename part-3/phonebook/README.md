# Phonebook App

## Overview

This is a simple Phonebook application that allows you to manage your contacts. You can add, edit (not working yet), and delete contacts using this application.

## Technologies Used

- Frontend: React
- Backend: Express.js

## Features

- View a list of contacts
- Add a new contact
- Delete a contact
- Filter and search for contacts
- Update contact information (not working yet)

## Setup

To run this application locally, follow these steps:

1. Clone the repository:

   [git clone](https://github.com/bruna-finholdt/fullstack-open-course)

2. Change to the project directory:

   cd part-3/phonebook

3. Install dependencies:

   npm install

4. Start the frontend:

   cd part-2/phonebook

   npm start

5. Start the backend:

   cd part-3/phonebook

   npm run dev

6. Access the application in your web browser:

   [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/persons` - Get a list of all contacts
- `GET /api/persons/:id` - Get a contact by ID
- `POST /api/persons` - Create a new contact
- `PUT /api/persons/:id` - Update a contact by ID (not working yet)
- `DELETE /api/persons/:id` - Delete a contact by ID

## Deployment

The backend of this application is deployed on [Render](https://backend-ux66.onrender.com).
